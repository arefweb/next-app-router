"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Montserrat } from 'next/font/google'
import {usePathname} from "next/navigation";
import clsx from 'clsx';

import logo from '@/assets/images/logo.png';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "700",
})

function WebsiteHeader() {
  const pathname = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div className={clsx(openMobileMenu ? 'h-full' : 'h-[60px]', 'relative flex justify-between items-center ' +
      'border-b-1 border-b-blue-100 px-3')}>
      <Link href="/" className="mr-8">
        <div className="flex items-center justify-between">
          <Image src={logo} alt="logo" />
          <h3 className={clsx(montserrat.className, 'text-lg')}>
            Cryptic
          </h3>
        </div>
      </Link>
      <div className="flex gap-3 h-full items-center px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpenMobileMenu((p) => !p)}
          className="px-2 py-1 m-2"
        >
          {openMobileMenu ? (
            <div className="w-[20px] h-[20px] relative">
              <span className="absolute top-[10px] left-0 block w-[20px] h-[3px] bg-black rotate-45" />
              <span className="absolute top-[10px] left-0 block w-[20px] h-[3px] bg-black rotate-135" />
            </div>
          ) : (
            <div className="w-[20px] h-[20px]">
              <span className="block w-[20px] h-[3px] bg-black mb-[3px]" />
              <span className="block w-[20px] h-[3px] bg-black mb-[3px]" />
              <span className="block w-[20px] h-[3px] bg-black mb-[3px]" />
            </div>
          )}
        </button>
          <span className="flex h-full items-center">
            <Link
              href="/panel/login"
              className="font-semibold border border-black rounded-3xl
              px-4 py-2 text-sm hover:bg-black hover:text-white"
            >
              Login
            </Link>
          </span>
      </div>
      <nav
        className={clsx(openMobileMenu ?
          'absolute top-[51px] left-0 block h-dvh w-dvw bg-white' :
          'hidden h-[60px]',
        'md:flex justify-between')}
      >
        <div className={clsx(openMobileMenu ? 'block' : 'flex gap-3 h-full items-center px-4')}>
          <span className={clsx("flex h-full items-center px-4",
            pathname === '/' && 'border-b-3 border-indigo-500')}>
            <Link
              href="/"
              className="font-bold hover:text-indigo-500"
              onClick={() => setOpenMobileMenu(false)}
            >
              Home
            </Link>
          </span>
          <span className={clsx("flex h-full items-center px-4",
            pathname === '/about' && 'border-b-3 border-indigo-500')}>
            <Link
              href="/about"
              className="font-bold hover:text-indigo-500"
              onClick={() => setOpenMobileMenu(false)}
            >
              About
            </Link>
          </span>
          <span className={clsx("flex h-full items-center px-4",
            pathname === '/server-comp' && 'border-b-3 border-indigo-500')}>
            <Link
              href="/server-comp"
              className="font-bold hover:text-indigo-500"
              onClick={() => setOpenMobileMenu(false)}
            >
              Server Comp
            </Link>
          </span>
        </div>
        <span className="h-full items-center hidden md:flex">
          <Link
            href="/panel/login"
            className="font-semibold border border-black rounded-3xl
            px-4 py-2 text-sm hover:bg-black hover:text-white"
          >
            Login
          </Link>
        </span>
      </nav>
    </div>
  );
}

export default WebsiteHeader;