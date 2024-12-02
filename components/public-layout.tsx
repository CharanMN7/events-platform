/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "./ui/button";
import { CircleUserIcon } from "lucide-react";
import Link from "next/link";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-foreground">
          <Link href="/" className="cursor-link">
            ANTF-AP
          </Link>
        </h1>
        <Button variant="outline" asChild>
          <Link href="/login">
            <CircleUserIcon className="mr-2 h-4 w-4" /> Admin
          </Link>
        </Button>
      </header>

      {children}

      <footer className="p-6 border-t mt-4 lg:px-48">
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-max text-center gap-2">
            <img src="https://placehold.co/150x100" alt="" />
            <p className="text-2xl font-semibold">ANTF-AP</p>
          </div>

          <div className="flex flex-col gap-2 text-center">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Careers
            </Link>
            <Link href="/faq" className="hover:underline">
              FAQ
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2024{" "}
          <a href="https://www.charan.dev/" className="underline">
            Charan
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
};
export default PublicLayout;
