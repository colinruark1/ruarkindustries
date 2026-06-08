// Scheduler API + static host for the Ruark Industries site.
//
//   GET  /api/scheduler/config        -> business hours / timezone / duration
//   GET  /api/scheduler/availability  -> bookable slots for ?date=YYYY-MM-DD
//   POST /api/scheduler/book          -> create a Bookings + Teams appointment
//
// Run:  cd server && npm install && npm start
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config, graphConfigured } from "./config.js";
import { generateSlots } from "./slots.js";
import { getBusyStartTimes, createAppointment } from "./graph.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");

const app = express();
app.use(express.json());

// CORS: only needed when the site is hosted separately from this API.
if (config.allowedOrigins.length > 0) {
  app.use(cors({ origin: config.allowedOrigins }));
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Public config so the frontend can render the right window/labels. ---
app.get("/api/scheduler/config", (req, res) => {
  res.json({
    timeZone: config.timeZone,
    openHour: config.openHour,
    closeHour: config.closeHour,
    slotDurationMinutes: config.slotDurationMinutes,
    slotIntervalMinutes: config.slotIntervalMinutes,
    // Lets the UI show a "demo mode" hint before Bookings is connected.
    bookingsConnected: graphConfigured,
  });
});

// --- Available slots for a single day. ---
app.get("/api/scheduler/availability", async (req, res) => {
  const date = String(req.query.date || "");
  if (!DATE_RE.test(date)) {
    return res.status(400).json({ error: "Provide ?date=YYYY-MM-DD" });
  }

  const slots = generateSlots(date);

  let busy = new Set();
  try {
    busy = await getBusyStartTimes(date);
  } catch (err) {
    // Don't fail the whole request if availability lookup hiccups —
    // fall back to showing the full grid.
    console.warn("availability lookup failed:", err.message);
  }

  res.json({
    date,
    timeZone: config.timeZone,
    slots: slots.map((s) => ({
      start: s.start,
      end: s.end,
      startDateTime: s.startDateTime,
      endDateTime: s.endDateTime,
      available: !busy.has(s.start),
    })),
  });
});

// --- Book the appointment. ---
app.post("/api/scheduler/book", async (req, res) => {
  const { name, email, date, time, topic, notes } = req.body || {};

  if (!name || !EMAIL_RE.test(email || "") || !DATE_RE.test(date || "") || !time) {
    return res
      .status(400)
      .json({ error: "name, valid email, date (YYYY-MM-DD) and time are required" });
  }

  // Re-derive the slot server-side so the client can't book off-grid times.
  const slot = generateSlots(date).find((s) => s.start === time);
  if (!slot) {
    return res.status(400).json({ error: "That time is not a valid slot." });
  }

  if (!graphConfigured) {
    return res.status(503).json({
      error:
        "Booking is not connected yet. Add your Microsoft credentials to .env to enable it.",
    });
  }

  try {
    const noteText = [topic ? `Topic: ${topic}` : "", notes || ""]
      .filter(Boolean)
      .join("\n");

    const result = await createAppointment({
      startDateTime: slot.startDateTime,
      endDateTime: slot.endDateTime,
      customerName: name,
      customerEmail: email,
      notes: noteText,
    });

    res.json({
      ok: true,
      appointmentId: result.id,
      joinUrl: result.joinUrl,
      date,
      start: slot.start,
      end: slot.end,
      timeZone: config.timeZone,
    });
  } catch (err) {
    console.error("booking failed:", err.message);
    res.status(502).json({ error: "Could not create the appointment. Please try again." });
  }
});

// --- Serve the static site (same origin as the API). ---
app.use(express.static(siteRoot));

app.listen(config.port, () => {
  console.log(`Ruark scheduler running on http://localhost:${config.port}`);
  console.log(
    graphConfigured
      ? "Microsoft Bookings: connected"
      : "Microsoft Bookings: NOT configured (slots show, booking disabled). Fill in .env."
  );
});
