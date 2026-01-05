import axios from "axios";
import {
  TrackerConfig,
  HistoryState,
} from "../../features/dashboard/tools/NotMe/types";

const API_URL = "http://localhost:8000/api/v1/not-me";

export const trackerApi = {
  async fetchTrackers(): Promise<TrackerConfig[]> {
    const response = await axios.get(`${API_URL}/trackers`);
    return response.data;
  },

  async fetchHistory(): Promise<HistoryState> {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  },

  async updateValue(
    date: string,
    trackerId: string,
    value: any
  ): Promise<void> {
    await axios.post(`${API_URL}/log`, {
      tracker_id: trackerId,
      date: date,
      value: value,
    });
  },

  async addTracker(tracker: Partial<TrackerConfig>): Promise<TrackerConfig> {
    const response = await axios.post(`${API_URL}/trackers`, tracker);
    return response.data;
  },

  async deleteTracker(trackerId: string): Promise<void> {
    await axios.delete(`${API_URL}/trackers/${trackerId}`);
  },
};
