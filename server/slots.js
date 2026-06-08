// Slot generation — produces meeting start times on every :00 and :30
// between the configured open and close hours.
import { config } from "./config.js";

// Pad a number to two digits, e.g. 8 -> "08".
function pad(n) {
  return String(n).padStart(2, "0");
}

// Convert "HH:MM" into minutes since midnight.
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Convert minutes since midnight back into "HH:MM".
function toHHMM(minutes) {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

/**
 * Build the list of bookable slots for a given calendar date (YYYY-MM-DD).
 * Every slot starts on a :00 or :30 boundary, the first starts at the open
 * hour, and the last slot ends no later than the close hour.
 *
 * Returns: [{ start: "08:00", end: "08:30", startDateTime, endDateTime }]
 * where the *DateTime values are naive ISO strings (no offset) to be paired
 * with the business time zone when sent to Graph.
 */
export function generateSlots(date) {
  const open = config.openHour * 60;
  const close = config.closeHour * 60;
  const step = config.slotIntervalMinutes;
  const duration = config.slotDurationMinutes;

  const slots = [];
  for (let start = open; start + duration <= close; start += step) {
    const startHHMM = toHHMM(start);
    const endHHMM = toHHMM(start + duration);
    slots.push({
      start: startHHMM,
      end: endHHMM,
      // e.g. "2026-06-08T08:00:00" — local to BUSINESS_TIMEZONE.
      startDateTime: `${date}T${startHHMM}:00`,
      endDateTime: `${date}T${endHHMM}:00`,
    });
  }
  return slots;
}

export { toMinutes };
