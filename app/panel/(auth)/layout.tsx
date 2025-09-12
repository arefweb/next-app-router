'use client';

import React from 'react';
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import clsx from "clsx";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "700",
})

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cyan-500 flex flex-col">
      <div className="bg-white h-[60px] px-2 flex justify-between items-center">
        <Link href="/" className="mr-8">
          <div className="flex items-center justify-between">
            <Image src={logo} alt="logo" />
            <h3 className={clsx(montserrat.className, 'text-lg')}>
              Cryptic
            </h3>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;