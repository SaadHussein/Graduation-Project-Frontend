export type UserProfile = {
  age: number;
  avatar_url: string;
  exercise_preferences: string;
  fitness_goals: string;
  fitness_level: string;
  full_name: string;
  gender: string;
  height_cm: number;
  id: string;
  location: string;
  updated_at: string;
  weight_kg: number;
  days_available: string;
  time_per_session_mins: number;
  gym_equipment: string;
};

export type User = {
  email: string | undefined;
  id: string | undefined;
};

export type Plan = {
  day1: string[];
  day2: string[];
  day3: string[];
  day4: string[];
  day5: string[];
};
