import { UserProfile } from "@/types";

export const getPlans = async (userProfile: UserProfile) => {
  console.log(userProfile);
  const response = await fetch("https://advancedplan.onrender.com/predict", {
    method: "POST",
    body: JSON.stringify({
      Age: userProfile?.age,
      Gender: userProfile?.gender,
      Height_cm: userProfile?.height_cm,
      Weight_kg: userProfile?.weight_kg,
      Fitness_Goals: userProfile?.fitness_goals,
      Fitness_Level: userProfile?.fitness_level,
      Days_Available: userProfile?.days_available,
      Time_per_Session_mins: userProfile?.time_per_session_mins,
      Exercise_Preferences: userProfile?.exercise_preferences,
      Gym_Equipment: userProfile?.gym_equipment,
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};
