import { Metadata } from "next";
import { UserAuthForm } from "@/components/user-auth-form";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="lg:p-8 h-screen flex">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back boos!
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to login.
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
