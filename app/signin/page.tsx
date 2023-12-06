"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/supabase";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignIn = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      console.log(data);
      router.push("/profilePage");
    } catch (error) {
      alert("There is Error;");
    }
  };
  return (
    <div className="flex items-start justify-center gap-20 px-6 py-5 mt-4 bg-white max-w-full h-[95vh]">
      <div className="lg:flex hidden items-start justify-start flex-col bg-gray-200 w-[50%] h-[100%] rounded-md p-8">
        <Link
          href="/"
          className="flex items-center justify-center top-5 left-5 gap-2"
        >
          <Image src="/Logo.png" alt="Logo" width={40} height={40}></Image>
          <Image src="/XFit.png" alt="Logo" width={40} height={40}></Image>
        </Link>
        <h1 className="mt-14 xl:text-[48px] text-[32px] text-[#343A40]">
          Welcome Back to XFit!
        </h1>
        <p className="mt-10 xl:text-[24px] lg:text-[18px] text-[#495057]">
          Login to Improve Your Fitness and Health and Getting More Better and
          Better and achiveing Your Goals.
        </p>
        <div className="relative bg-[#071620] rounded-md mt-auto">
          <div className="absolute flex items-center justify-center gap-3 -top-14 left-8">
            <Image src="/qoute.png" alt="Qoute" width={40} height={50}></Image>
            <Image src="/qoute.png" alt="Qoute" width={40} height={50}></Image>
          </div>
          <p className="text-[#D0D9DF] text-[24px] px-10 py-8">
            X-Fit is very useful and helped me to improve my fitness and
            achiving my Goals in a Perfect Way, It is an amazing Application, I
            Love It.
          </p>
          <div className="flex items-center justify-start gap-3 px-10 py-8">
            <Image
              src="/customer.png"
              alt="Customer Image"
              width={65}
              height={65}
              className="rounded-full"
            ></Image>
            <div className="flex items-start justify-start flex-col">
              <p className="text-white text-[18px]">Sarah Doe</p>
              <p className="text-white text-[18px]">One Of Our Customers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] w-[90%] h-[100%] flex items-start justify-start flex-col mt-32">
        <h1 className="text-[52px] text-[#343A40] font-bold">Sign in</h1>
        <p className="md:text-[32px] sm:text-[24px] text-[18px] text-[#868E96] mb-10">
          Log in and continue creating. Your creativity awaits.
        </p>
        <form onSubmit={handleSignIn} className="w-full">
          <div className="flex items-start justify-start flex-col mb-3">
            <label
              htmlFor="userEmail"
              className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="userEmail"
              placeholder="Enter Your Email"
              className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none lg:w-[90%] w-[100%]"
            />
          </div>
          <div className="flex items-start justify-start flex-col mb-3">
            <label
              htmlFor="userPassword"
              className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
            >
              Password
            </label>
            <input
              type="password"
              id="userPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none lg:w-[90%] w-[100%]"
            />
          </div>
          <button
            type="submit"
            className="text-[#154360] bg-[#00FFA4] sm:text-[24px] lg:w-[90%] w-[100%] text-center rounded-md py-3"
          >
            Sign In
          </button>
        </form>
        <div className="flex sm:flex-row flex-col items-center justify-center sm:gap-3 gap-1 mx-auto mt-8 sm:text-[20px]">
          <p>New To X-Fit ?</p>
          <Link href="/register" className="text-[#154360]">
            Come to Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
