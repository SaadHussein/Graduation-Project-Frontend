"use client";

import React from "react";
import { useEffect, useState } from "react";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { UserProfile, User } from "@/types";

const UpdateDataPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [fullName, setFullName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [age, setAge] = useState<number | undefined>(0);
  const [weight, setWeight] = useState<number | undefined>(0);
  const [height, setHeight] = useState<number | undefined>(0);
  const [timePerSession, setTimePerSession] = useState<number | undefined>(0);
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
      } else {
        alert("No Data Found.");
      }
    };

    checkSession();
  }, [supabase]);

  const updateData = async () => {
    if (
      fullName === "" &&
      age === 0 &&
      weight === 0 &&
      height === 0 &&
      timePerSession === 0
    ) {
      alert(
        "Error, If you want to edit your informations please fill inputs to update your data."
      );
      return;
    }
    if (fullName !== "") {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user?.id);
    }
    if (age !== 0) {
      const { error } = await supabase
        .from("profiles")
        .update({ age: age })
        .eq("id", user?.id);
    }
    if (weight !== 0) {
      const { error } = await supabase
        .from("profiles")
        .update({ weight_kg: weight })
        .eq("id", user?.id);
    }
    if (height !== 0) {
      const { error } = await supabase
        .from("profiles")
        .update({ height_cm: height })
        .eq("id", user?.id);
    }
    if (timePerSession !== 0) {
      const { error } = await supabase
        .from("profiles")
        .update({ time_per_session_mins: timePerSession })
        .eq("id", user?.id);
    }

    router.push("/dashboard");
  };

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
      <div className="mt-16 mb-10">
        <h1 className="text-[32px] font-semibold ">
          Your Personal information
        </h1>
        <p className="text-[18px]">
          You can change your information from here.
        </p>
      </div>
      <section className="flex md:items-center md:justify-between md:flex-row flex-col py-8 border-y-[2px] md:gap-0 gap-y-3">
        <p className="text-[22px]">Full Name</p>
        <Input
          className="text-[20px] md:max-w-[75%]"
          placeholder={userProfile?.full_name}
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            setFullName(e.target.value);
          }}
        ></Input>
      </section>
      <section className="flex md:items-center md:justify-between md:flex-row flex-col py-8 border-b-[2px] md:gap-0 gap-y-3">
        <p className="text-[22px]">Email Address</p>
        <Input
          className="text-[20px] md:max-w-[75%]"
          placeholder={user?.email}
          disabled
          type="email"
        ></Input>
      </section>
      <section className="flex md:items-center md:justify-between md:flex-row flex-col py-8 border-b-[2px] md:gap-0 gap-y-3">
        <p className="text-[22px]">Age</p>
        <Input
          className="text-[20px] md:max-w-[75%]"
          placeholder={userProfile?.age.toString()}
          onChange={(e) => setAge(+e.target.value)}
          type="number"
        ></Input>
      </section>
      <section className="flex md:items-center md:justify-between md:flex-row flex-col py-8 border-b-[2px] md:gap-0 gap-y-3">
        <p className="text-[22px]">Weight</p>
        <Input
          className="text-[20px] md:max-w-[75%]"
          placeholder={userProfile?.weight_kg.toString()}
          onChange={(e) => setWeight(+e.target.value)}
          type="number"
        ></Input>
      </section>
      <section className="flex md:items-center md:justify-between md:flex-row flex-col py-8 border-b-[2px] md:gap-0 gap-y-3">
        <p className="text-[22px]">Height</p>
        <Input
          className="text-[20px] md:max-w-[75%]"
          placeholder={userProfile?.height_cm.toString()}
          onChange={(e) => setHeight(+e.target.value)}
          type="number"
        ></Input>
      </section>
      <section className="flex md:items-center md:justify-between md:flex-row flex-col py-8 border-b-[2px] md:gap-0 gap-y-3">
        <p className="text-[20px]">Time in Minute Per Session</p>
        <Input
          className="text-[20px] md:max-w-[75%]"
          placeholder={userProfile?.time_per_session_mins.toString()}
          onChange={(e) => setTimePerSession(+e.target.value)}
          type="number"
        ></Input>
      </section>
      <div className="flex items-end justify-end py-4">
        <button
          className="py-2 px-4 text-[20px] text-black rounded-md"
          onClick={() => router.push("/dashboard")}
        >
          Cancel
        </button>
        <button
          className="bg-green-400 py-2 px-4 text-[20px] text-white rounded-md"
          onClick={() => updateData()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateDataPage;
