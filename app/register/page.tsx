"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const Register = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values.password === values.confirmPassword) {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      console.log(data);

      if (data.user === null) {
        alert("This Email Already Found.");
      } else {
        router.push("/informationForm");
      }
    }
  }

  return (
    <div className="flex items-center justify-center mx-auto px-5 py-5 mt-4 bg-white max-w-full h-[95vh] gap-8">
      <div className="lg:flex hidden items-start justify-start flex-col bg-[#A26BFD] w-[35%] h-[100%] rounded-md p-8">
        <Link
          href="/"
          className="flex items-center justify-center top-5 left-5 gap-2"
        >
          <Image src="/Logo.png" alt="Logo" width={40} height={40}></Image>
          <Image src="/XFit.png" alt="Logo" width={40} height={40}></Image>
        </Link>
        <h1 className="mt-14 2xl:text-[48px] text-[36px] text-[#ECE1FF]">
          Welcome to XFit!
        </h1>
        <p className="mt-10 2xl:text-[24px] text-[20px] text-[#E0CEFE]">
          Sign Up with Us to Improve Your Fitness and Health and Getting More
          Better and Better and achiveing Your Goals.
        </p>
        <div className=" bg-[#51357E] rounded-md mt-auto">
          <p className="text-[#D0D9DF] 2xl:text-[24px] xl:text-[20px] text-[16px] px-10 xl:py-8 py-3">
            X-Fit is very useful and helped me to improve my fitness and
            achiving my Goals in a Perfect Way, It is an amazing Application, I
            Love It.
          </p>
          <div className="flex items-center justify-start gap-3 px-10 py-8">
            <Image
              src="/customerTwo.png"
              alt="Customer Image"
              width={65}
              height={65}
              className="rounded-2xl"
            ></Image>
            <div className="flex items-start justify-start flex-col">
              <p className="text-white text-[18px]">John Doe</p>
              <p className="text-white text-[18px]">One Of Our Customers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[65%] h-[100%] mx-auto flex items-center justify-center flex-col">
        <h1 className="md:text-[52px] text-[40px] text-[#343A40] font-bold text-center">
          Register to X-Fit
        </h1>
        <p className="sm:text-[32px] text-[16px] text-center text-[#868E96] mb-10">
          Register with Us and Become Better and Better.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex sm:items-start items-center justify-center flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel className="sm:text-[20px] text-[16px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="w-full py-2 px-2 text-[18px]"
                    />
                  </FormControl>
                  <FormDescription>Enter Your Email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sm:text-[20px] text-[16px]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="w-full py-2 px-2 text-[18px]"
                    />
                  </FormControl>
                  <FormDescription>Enter Your Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sm:text-[20px] text-[16px]">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      className="w-full py-2 px-2 text-[18px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Confirm Your Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 text-[20px] px-4 py-1">
              Submit
            </Button>
          </form>
        </Form>
        {/* <form className="w-full flex items-start justify-center flex-col"> */}
        {/* <div className="flex items-start justify-start flex-row mb-5 w-full gap-5">
            <div className="flex items-start justify-center flex-col w-[33%]">
              <label
                htmlFor="userName"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                placeholder="Enter Your Name"
                className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]"
              />
            </div>
            <div className="flex items-start justify-center flex-col w-[32%]">
              <label
                htmlFor="userEmail"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                placeholder="Enter Your Email"
                className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]"
              />
            </div>
            <div className="flex items-start justify-center flex-col w-[32%]">
              <label
                htmlFor="userAge"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Your Age
              </label>
              <input
                type="number"
                id="userAge"
                placeholder="Enter Your Age"
                className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]"
              />
            </div>
          </div>
          <div className="flex items-start justify-start flex-row mb-3 w-full gap-5">
            <div className="flex items-start justify-center flex-col w-[32.5%]">
              <label
                htmlFor="userGender"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Gender
              </label>
              <Select>
                <SelectTrigger className="border-[2px] px-2 py-7 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]">
                  <SelectValue placeholder="Your Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male" className="text-[18px]">
                    Male
                  </SelectItem>
                  <SelectItem value="female" className="text-[18px]">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start justify-center flex-col w-[32.25%]">
              <label
                htmlFor="userLocation"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Location
              </label>
              <input
                type="text"
                id="userLocation"
                placeholder="Your Location"
                className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]"
              />
            </div>
            <div className="flex items-start justify-center flex-col w-[32.5%]">
              <label
                htmlFor="userHeight"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Height
              </label>
              <input
                type="number"
                id="userHeight"
                placeholder="Enter Your Height"
                className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]"
              />
            </div>
          </div>
          <div className="flex items-start justify-start flex-row mb-3 w-full gap-5">
            <div className="flex items-start justify-center flex-col w-[32.5%]">
              <label
                htmlFor="userWeight"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Weight
              </label>
              <input
                type="number"
                id="userWeight"
                placeholder="Enter Your Weight"
                className="border-[2px] px-2 py-3 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]"
              />
            </div>
            <div className="flex items-start justify-center flex-col w-[32.25%]">
              <label
                htmlFor="userFitnessLevel"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Fitness Level
              </label>
              <Select>
                <SelectTrigger className="border-[2px] px-2 py-7 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]">
                  <SelectValue placeholder="Your Fitness Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner" className="text-[18px]">
                    Beginner
                  </SelectItem>
                  <SelectItem value="intermediate" className="text-[18px]">
                    Intermediate
                  </SelectItem>
                  <SelectItem value="advanced" className="text-[18px]">
                    Advanced
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start justify-center flex-col w-[32.5%]">
              <label
                htmlFor="userHeight"
                className="sm:text-[24px] text-[20px] mb-1 text-[#868E96]"
              >
                Your Fitness Goal
              </label>
              <Select>
                <SelectTrigger className="border-[2px] px-2 py-7 sm:text-[20px] bg-transparent rounded-md outline-none w-[100%]">
                  <SelectValue placeholder="Your Fitness Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Maintain overall health and well-being"
                    className="text-[18px]"
                  >
                    Maintain overall Health and Well-Being
                  </SelectItem>
                  <SelectItem
                    value="Build muscle and increase strength"
                    className="text-[18px]"
                  >
                    Build Muscle and Increase Strength
                  </SelectItem>
                  <SelectItem
                    value="Gain endurance and boost cardiovascular health"
                    className="text-[18px]"
                  >
                    Gain Endurance and Boost Cardiovascular Health
                  </SelectItem>
                  <SelectItem
                    value="Lose weight and improve overall fitness"
                    className="text-[18px]"
                  >
                    Lose Weight and Improve overall Fitness
                  </SelectItem>
                  <SelectItem
                    value="Enhance flexibility and reduce stress"
                    className="text-[18px]"
                  >
                    Enhance Flexibility and Reduce Stress
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}
        {/* <button
            type="submit"
            className="text-[#ECE1FF] bg-[#51357E] sm:text-[24px] text-[18px] w-[100%] text-center rounded-md py-3 mt-3"
          >
            Sign In
          </button> */}
        {/* </form> */}
        <div className="flex sm:flex-row flex-col mx-auto w-[100%] items-center justify-center gap-3 mt-8 sm:text-[20px] text-[16px]">
          <p>Have Account ?</p>
          <Link href="/signin" className="text-[#154360]">
            Come to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
