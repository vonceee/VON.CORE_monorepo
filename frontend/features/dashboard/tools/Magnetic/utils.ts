import { Milestone } from "./types";

export const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return { days, hours };
};

export const getNextOccurrence = (m: Milestone) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight

  let target = new Date(m.event_date);
  // Ensure target is also midnight (usually is from YYYY-MM-DD string, but good to be safe)
  // If event_date is ISO with time, this might be needed.
  // Assuming strict YYYY-MM-DD:

  if (m.frequency === "annual") {
    target.setFullYear(today.getFullYear());
    if (target < today) {
      target.setFullYear(today.getFullYear() + 1);
    }
  } else if (m.frequency === "monthly") {
    target.setMonth(today.getMonth());
    target.setFullYear(today.getFullYear());
    if (target < today) {
      target.setMonth(today.getMonth() + 1);
    }
  }

  return target;
};
