import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Milestone } from "../types";

const API_URL = "http://localhost:8000/api/v1/magnetic";

export const useMagnetic = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMilestones = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/milestones`);
      setMilestones(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch milestones:", err);
      setError("Failed to load milestones");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMilestone = useCallback(
    async (
      milestone: Omit<
        Milestone,
        "id" | "user_id" | "created_at" | "updated_at"
      >,
    ) => {
      try {
        const response = await axios.post(`${API_URL}/milestones`, milestone);
        setMilestones((prev) => [...prev, response.data]);
        window.dispatchEvent(new Event("magnetic-update"));
        return response.data;
      } catch (err) {
        console.error("Failed to add milestone:", err);
        throw err;
      }
    },
    [],
  );

  const updateMilestone = useCallback(
    async (id: string, updates: Partial<Milestone>) => {
      try {
        const response = await axios.patch(
          `${API_URL}/milestones/${id}`,
          updates,
        );
        setMilestones((prev) =>
          prev.map((m) => (m.id === id ? response.data : m)),
        );
        window.dispatchEvent(new Event("magnetic-update"));
        return response.data;
      } catch (err) {
        console.error("Failed to update milestone:", err);
        throw err;
      }
    },
    [],
  );

  const deleteMilestone = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/milestones/${id}`);
      setMilestones((prev) => prev.filter((m) => m.id !== id));
      window.dispatchEvent(new Event("magnetic-update"));
    } catch (err) {
      console.error("Failed to delete milestone:", err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchMilestones();

    const handleUpdate = () => {
      fetchMilestones();
    };

    window.addEventListener("magnetic-update", handleUpdate);
    return () => window.removeEventListener("magnetic-update", handleUpdate);
  }, [fetchMilestones]);

  return {
    milestones,
    isLoading,
    error,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    refresh: fetchMilestones,
  };
};
