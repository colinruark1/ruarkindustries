// Microsoft Graph helpers — auth (client credentials) plus the two Bookings
// operations we need: read staff availability and create an appointment.
import { ConfidentialClientApplication } from "@azure/msal-node";
import { config, graphConfigured } from "./config.js";

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

let msalClient = null;

function getClient() {
  if (!msalClient) {
    msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: config.clientId,
        authority: `https://login.microsoftonline.com/${config.tenantId}`,
        clientSecret: config.clientSecret,
      },
    });
  }
  return msalClient;
}

// Acquire an app-only Graph token via the client-credentials flow.
// MSAL caches and refreshes the token internally.
async function getToken() {
  const result = await getClient().acquireTokenByClientCredential({
    scopes: [config.graphScope],
  });
  if (!result || !result.accessToken) {
    throw new Error("Failed to acquire Graph access token");
  }
  return result.accessToken;
}

// Thin wrapper around fetch that attaches the bearer token and surfaces
// Graph error bodies as thrown errors.
async function graphFetch(pathname, options = {}) {
  const token = await getToken();
  const res = await fetch(`${GRAPH_BASE}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const body = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message =
      (body && body.error && body.error.message) || `Graph ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.graph = body;
    throw err;
  }
  return body;
}

/**
 * Ask Bookings which of the day's slots the staff member is free for.
 * Returns a Set of "HH:MM" start times that are BUSY (so the caller can
 * mark the rest as available).
 *
 * If Bookings is not configured, or the call fails, we return an empty set
 * and let every generated slot remain bookable (graceful degradation).
 */
export async function getBusyStartTimes(date) {
  if (!graphConfigured || !config.staffId) return new Set();

  const body = {
    staffIds: [config.staffId],
    startDateTime: {
      dateTime: `${date}T00:00:00`,
      timeZone: config.timeZone,
    },
    endDateTime: {
      dateTime: `${date}T23:59:59`,
      timeZone: config.timeZone,
    },
  };

  const data = await graphFetch(
    `/solutions/bookingBusinesses/${encodeURIComponent(
      config.businessId
    )}/getStaffAvailability`,
    { method: "POST", body: JSON.stringify(body) }
  );

  const busy = new Set();
  const items = (data && data.value) || [];
  for (const staff of items) {
    for (const item of staff.availabilityItems || []) {
      // Anything that isn't "available" blocks the slot it covers.
      if (item.status && item.status !== "available") {
        const start = item.startDateTime && item.startDateTime.dateTime;
        if (start) {
          // start looks like "2026-06-08T09:00:00.0000000"
          const hhmm = start.slice(11, 16);
          busy.add(hhmm);
        }
      }
    }
  }
  return busy;
}

/**
 * Create a Bookings appointment with a Teams online meeting.
 * Returns { id, joinUrl } where joinUrl is the Teams join link (if any).
 */
export async function createAppointment({
  startDateTime,
  endDateTime,
  customerName,
  customerEmail,
  notes,
}) {
  const payload = {
    "@odata.type": "#microsoft.graph.bookingAppointment",
    serviceId: config.serviceId,
    staffMemberIds: config.staffId ? [config.staffId] : [],
    // Generate a Microsoft Teams meeting for this appointment.
    isLocationOnline: true,
    customerTimeZone: config.timeZone,
    startDateTime: { dateTime: startDateTime, timeZone: config.timeZone },
    endDateTime: { dateTime: endDateTime, timeZone: config.timeZone },
    customers: [
      {
        "@odata.type": "#microsoft.graph.bookingCustomerInformation",
        name: customerName,
        emailAddress: customerEmail,
        notes: notes || "",
      },
    ],
  };

  const data = await graphFetch(
    `/solutions/bookingBusinesses/${encodeURIComponent(
      config.businessId
    )}/appointments`,
    { method: "POST", body: JSON.stringify(payload) }
  );

  return {
    id: data && data.id,
    joinUrl:
      (data && data.onlineMeetingUrl) ||
      (data && data.joinWebUrl) ||
      (data && data.onlineMeeting && data.onlineMeeting.joinUrl) ||
      null,
  };
}
