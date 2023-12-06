"use client";

import React from "react";
import { useEffect, useState } from "react";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";

type UserProfile = {
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

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id);
      console.log(data);

      const userData: UserProfile | null = data ? data[0] : null;

      if (userData) {
        setUserProfile(userData);
      } else {
        alert("No Data Found.");
      }
    };

    checkSession();
  }, [supabase]);

  const getPlans = async () => {
    console.log("Hi");
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

    console.log(response);

    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <h1>Username is : {userProfile?.full_name}</h1>
      <h1>and The Age is : {userProfile?.age}</h1>
      <h1>
        Your Height is : {userProfile?.height_cm} cm and Your Weight is :{" "}
        {userProfile?.weight_kg} Kg
      </h1>
      <button
        onClick={() => {
          supabase.auth.signOut();
          router.push("/");
        }}
        className="bg-green-400 py-2 px-4 text-[20px] text-white rounded-md"
      >
        Logout
      </button>
      <button onClick={getPlans}>Plans</button>
    </div>
  );
};

export default ProfilePage;
