"use client";

import React from "react";
import Image from "next/image";
import supabase from "@/supabase";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  fullname: z.string().min(3),
  height: z.string(),
  weight: z.string(),
  age: z.string(),
  gender: z.string(),
  location: z.string(),
  fitnessLevel: z.string(),
  fitnessGoal: z.string(),
  exercisePreferences: z.string(),
  timeForSessionInMintues: z.string(),
  daysAvailablePerWeek: z.string(),
  gymEquipment: z.string(),
});

const InformationForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      height: "",
      weight: "",
      age: "",
      gender: "",
      location: "",
      fitnessLevel: "",
      fitnessGoal: "",
      exercisePreferences: "",
      timeForSessionInMintues: "",
      daysAvailablePerWeek: "",
      gymEquipment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: values.fullname,
        age: +values.age,
        gender: values.gender,
        location: values.location,
        weight_kg: +values.weight,
        height_cm: +values.height,
        fitness_goals: values.fitnessGoal,
        fitness_level: values.fitnessLevel,
        exercise_preferences: values.exercisePreferences,
      })
      .eq("id", user?.id);

    if (error === null) {
      console.log(error);
      router.push("/profilePage");
    }
  }
  return (
    <div className="flex items-center justify-center flex-col mt-5 mx-auto max-w-screen-2xl px-6">
      <h1 className="sm:text-[36px] text-[28px] text-[#343A40] font-bold mt-20 text-center">
        To Get Started, We need Informations about You.
      </h1>
      <p className="sm:text-[20px] text-[16px] text-[#343A40] font-semibold text-center mt-4">
        This information will help us to give you customize plan that help you
        to get better.
      </p>
      <Form {...form}>
        <form
          className="w-full flex items-center justify-center mt-10 flex-col gap-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full flex items-center justify-between lg:flex-row flex-col gap-6">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Fullname</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:text-[18px] text-[12px]"
                      placeholder="Fullname"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Your Fullname.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Weight</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:text-[18px] text-[12px]"
                      type="number"
                      placeholder="Weight"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Your Weight.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Height</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:text-[18px] text-[12px]"
                      type="number"
                      placeholder="Height"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Your Height.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-between lg:flex-row flex-col gap-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="sm:text-[18px] text-[12px]">
                        <SelectValue placeholder="Select Your Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Male"
                      >
                        Male
                      </SelectItem>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Female"
                      >
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Enter Your Gender.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Age</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:text-[18px] text-[12px]"
                      type="number"
                      placeholder="Age"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Your Age.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Location</FormLabel>
                  <FormControl>
                    <Input
                      className="sm:text-[18px] text-[12px]"
                      type="text"
                      placeholder="Location"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Your Location.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-between lg:flex-row flex-col gap-6">
            <FormField
              control={form.control}
              name="fitnessGoal"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">FitnessGoal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="sm:text-[18px] text-[12px]">
                        <SelectValue placeholder="Select Your Fitness Goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Maintain overall health and well-being"
                      >
                        Maintain overall Health and Well-Being
                      </SelectItem>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Build muscle and increase strength"
                      >
                        Build Muscle and Increase Strength
                      </SelectItem>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Gain endurance and boost cardiovascular health"
                      >
                        Gain Endurance and Boost Cardiovascular Health
                      </SelectItem>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Lose weight and improve overall fitness"
                      >
                        Lose Weight and Improve overall Fitness
                      </SelectItem>
                      <SelectItem
                        className="sm:text-[18px] text-[12px]"
                        value="Enhance flexibility and reduce stress"
                      >
                        Enhance Flexibility and Reduce Stress
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Enter Your Fitness Goal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fitnessLevel"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">FitnessLevel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="sm:text-[18px] text-[12px]">
                        <SelectValue placeholder="Select Your FitnessLevel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Beginner"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Beginner
                      </SelectItem>
                      <SelectItem
                        value="Intermediate"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Intermediate
                      </SelectItem>
                      <SelectItem
                        value="Advanced"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Enter Your FitnessLevel.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exercisePreferences"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">
                    Exercise Preferences
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="sm:text-[18px] text-[12px]">
                        <SelectValue placeholder="Select Your Exercise Preferences" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Varied, including Strength and Cardio"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Varied, including strength and cardio
                      </SelectItem>
                      <SelectItem
                        value="Free weights, compound exercises"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Free Weights, Compound Exercises
                      </SelectItem>
                      <SelectItem
                        value="Cardio and bodyweight exercises"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Cardio and Bodyweight Exercises
                      </SelectItem>
                      <SelectItem
                        value="Cardio, running, cycling"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Cardio, Running, Cycling
                      </SelectItem>
                      <SelectItem
                        value="Yoga and Pilates"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Yoga and Pilates
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Enter Your FitnessLevel.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-between lg:flex-row flex-col gap-6">
            <FormField
              control={form.control}
              name="timeForSessionInMintues"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">
                    Time For Session In Mintues
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="sm:text-[18px] text-[12px]"
                      type="number"
                      placeholder="Time For Session In Mintues"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter Your Time For Session In Mintues.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="daysAvailablePerWeek"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">
                    Days Available Per Week
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="sm:text-[18px] text-[12px]">
                        <SelectValue placeholder="Select Your Days Available Per Week" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="3 days a week"
                        className="sm:text-[18px] text-[12px]"
                      >
                        3 Days Per Week
                      </SelectItem>
                      <SelectItem
                        value="5 days a week"
                        className="sm:text-[18px] text-[12px]"
                      >
                        5 Days Per Week
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Enter Your Days Available Per Week.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gymEquipment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[20px]">Gym Equipment</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="sm:text-[18px] text-[12px]">
                        <SelectValue placeholder="Select Your Gym Equipment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Full gym access"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Full Gym Access
                      </SelectItem>
                      <SelectItem
                        value="Bench press, squat rack"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Bench Press, Squat Rack
                      </SelectItem>
                      <SelectItem
                        value="Treadmill, resistance bands"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Treadmill, Resistance Bands
                      </SelectItem>
                      <SelectItem
                        value="Stationary bike, treadmill"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Stationary Bike, Treadmill
                      </SelectItem>
                      <SelectItem
                        value="Yoga mat, resistance bands"
                        className="sm:text-[18px] text-[12px]"
                      >
                        Yoga Mat, Resistance Bands
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Enter Your Gym Equipment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="text-[20px] py-3">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InformationForm;
