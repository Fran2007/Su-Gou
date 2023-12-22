"use client";

import Image from 'next/image'
import cohet from "@/Images/cohet.png"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import SignupValidation from "@/lib/SignupValidation";
import { Input } from "@/components/ui/input";

export default function SignupForms() {
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //* 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
  }

  return (
    <div className="flex items-center min-h-screen bg-slate-50">
    <div className="absolute inset-0 item mx-72 my-52 bg-blue-400 opacity-10 blur-lg -left-40 h-80 w-80 rounded-full"></div>
    <div className="z-0">
      <h1 className="text-6xl font-bold my-11 ml-32 transform -translate-y-40">
        Sign up to <br /> Recharge Direct
      </h1>
      <p className="text-2xl ml-32 transform -translate-y-40">If you don't an account</p>
      <p className="text-2xl ml-32 transform -translate-y-40">
        you can{" "}
        <span className="font-semibold text-indigo-600 text">
          Register here!
        </span>
      </p>
    </div>
    <div className='bg-contain transform -translate-y-[-80] -translate-x-2'>
      <Image src={cohet} alt='Image' width={400} height={400}/>
    </div>
    <div className="flex ml-auto z-0 mr-24 -translate-y-11">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                 <FormControl>
                   <Input
                     type="text"
                     placeholder="Name and Last name"
                     className="bg-blue-50 h-14"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                 <FormControl>
                   <Input
                     type="Email"
                     placeholder="Enter Email"
                     className="bg-blue-50 h-14"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                 <FormControl>
                   <Input
                     type="Password"
                     placeholder="password"
                     className="bg-blue-50 h-14"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-slate-400 text-sm ml-52'>remember your password?</p>
            <Button
              type="submit"
              className="flex-initial w-96 h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-indigo-500/50 p-2 rounded-md mx-auto shadow-lg">
              Sign up
            </Button>
            <p className='text-slate-400 text-center'>Or continue with</p>
          </form>
        </Form>
      </div>
    </div>
  );
}
