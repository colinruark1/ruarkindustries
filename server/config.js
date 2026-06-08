// Centralised configuration, read once from the environment.
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the .env from the project root (one level up from /server).
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function num(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export const config = {
  // Azure AD / Graph
  tenantId: process.env.MS_TENANT_ID || "",
  clientId: process.env.MS_CLIENT_ID || "",
  clientSecret: process.env.MS_CLIENT_SECRET || "",
  graphScope: process.env.MS_GRAPH_SCOPE || "https://graph.microsoft.com/.default",

  // Bookings
  businessId: process.env.MS_BOOKINGS_BUSINESS_ID || "",
  serviceId: process.env.MS_BOOKINGS_SERVICE_ID || "",
  staffId: process.env.MS_BOOKINGS_STAFF_ID || "",

  // Scheduling window
  timeZone: process.env.BUSINESS_TIMEZONE || "America/New_York",
  openHour: num(process.env.BUSINESS_OPEN_HOUR, 8),
  closeHour: num(process.env.BUSINESS_CLOSE_HOUR, 17),
  slotIntervalMinutes: num(process.env.SLOT_INTERVAL_MINUTES, 30),
  slotDurationMinutes: num(process.env.SLOT_DURATION_MINUTES, 30),

  // Server
  port: num(process.env.PORT, 3000),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};

// True only when every credential needed to talk to Graph is present.
// When false, the API still returns the generated slot grid so the UI works
// in local/dev before Bookings is wired up.
export const graphConfigured = Boolean(
  config.tenantId &&
    config.clientId &&
    config.clientSecret &&
    config.businessId &&
    config.serviceId
);
