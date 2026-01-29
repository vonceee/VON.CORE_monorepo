export type Category = "birthday" | "anniversary" | "milestone" | "custom";
export type Frequency = "annual" | "monthly" | "one-time";

export interface Milestone {
  id: string;
  user_id: string;
  name: string;
  event_date: string; // YYYY-MM-DD
  category: Category;
  frequency: Frequency;
  created_at?: string;
  updated_at?: string;
}
