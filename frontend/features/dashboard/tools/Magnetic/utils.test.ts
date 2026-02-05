import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { calculateTimeLeft, getNextOccurrence } from "./utils";

describe("Magnetic Utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("calculateTimeLeft", () => {
    it("should return 0 days 0 hours for past dates", () => {
      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 1);
      const result = calculateTimeLeft(pastDate);
      expect(result).toEqual({ days: 0, hours: 0 });
    });

    it("should calculate correct days and hours for future dates", () => {
      const now = new Date(2023, 0, 1, 10, 0, 0); // Jan 1, 2023 10:00
      vi.setSystemTime(now);

      const target = new Date(2023, 0, 3, 12, 0, 0); // Jan 3, 2023 12:00
      // Diff: 2 days + 2 hours
      const result = calculateTimeLeft(target);
      expect(result).toEqual({ days: 2, hours: 2 });
    });
  });

  describe("getNextOccurrence", () => {
    it("should return the same date for upcoming one-time events", () => {
      const now = new Date(2023, 0, 1);
      vi.setSystemTime(now);

      const eventDate = "2023-01-10";
      const milestone = {
        id: "1",
        name: "Test",
        event_date: eventDate,
        frequency: "one-time",
        category: "test",
      } as any;

      const result = getNextOccurrence(milestone);
      expect(result.toISOString().split("T")[0]).toBe(eventDate);
    });

    it("should return next year for past annual events", () => {
      // Today: June 1, 2023
      const now = new Date(2023, 5, 1);
      vi.setSystemTime(now);

      // Event: Jan 1 (Birthday)
      const milestone = {
        id: "1",
        name: "Bday",
        event_date: "2000-01-01",
        frequency: "annual",
        category: "birthday",
      } as any;

      const result = getNextOccurrence(milestone);
      // Should be Jan 1, 2024
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });

    it("should return this year for upcoming annual events", () => {
      // Today: June 1, 2023
      const now = new Date(2023, 5, 1);
      vi.setSystemTime(now);

      // Event: Dec 25
      const milestone = {
        id: "1",
        name: "Xmas",
        event_date: "2000-12-25",
        frequency: "annual",
        category: "holiday",
      } as any;

      const result = getNextOccurrence(milestone);
      // Should be Dec 25, 2023
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(25);
    });
  });
});
