"use client";

import supabase from "@/supabase";
import { useEffect, useState } from "react";
import { UserProfile, User, Plan } from "@/types";
import { getPlans } from "@/utils/getPlans";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [plans, setPlans] = useState<Plan | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      setUser({ email: user?.email, id: user?.id });

      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id);
      console.log(data);

      const userData: UserProfile | null = data ? data[0] : null;

      if (userData) {
        setUserProfile(userData);
        const data = await getPlans(userData);
        setPlans(data);
      } else {
        alert("No Data Found.");
      }
    };

    checkSession();
  }, [supabase]);

  return (
    <div className="max-w-screen-2xl mx-auto px-3">
      <nav className="my-8 flex items-center justify-between">
        <div className="flex items-center justify-start gap-x-3">
          <Image src="/Logo.png" alt="Logo" width={40} height={40}></Image>
          <Image src="/XFit.png" alt="Logo" width={40} height={40}></Image>
        </div>

        <div className="flex items-center justify-center gap-6">
          <p className="text-[20px] sm:block hidden">
            {userProfile?.full_name}
          </p>
          <button
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
            className="bg-green-400 py-2 px-4 text-[20px] text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </nav>
      <h1 className="text-[28px] mt-16">
        This is Your Dashboard Page, {userProfile?.full_name}
      </h1>
      <h2 className="text-[25px] mt-9">Your exercises for this day: </h2>
      {plans?.day1.map((exercise, index) => (
        <p key={exercise + index}>
          {index + 1} - {exercise}
        </p>
      ))}

      <h3 className="mt-16 text-[20px]">
        Do yoy want to edit your data ?{" "}
        <button
          className="px-4 py-2 bg-green-400 text-white rounded-md ml-3"
          onClick={() => {
            router.push("/updateData");
          }}
        >
          Edit
        </button>
      </h3>
    </div>
  );
};

export default DashboardPage;
