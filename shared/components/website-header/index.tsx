"use client";

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from 'clsx';

function WebsiteHeader() {
  const pathname = usePathname();
  return (
    <div>
      <nav className="flex justify-between h-[60px] border-b-1 border-b-blue-800">
        <div className="flex gap-3 h-full items-center px-4">
          <span className={clsx("flex h-full items-center", pathname === '/' && 'border-b-3 border-indigo-500')}>
            <Link href="/">Home</Link>
          </span>
          <span className={clsx("flex h-full items-center", pathname === '/about' && 'border-b-3 border-indigo-500')}>
            <Link href="/about">About</Link>
          </span>
          <span className={clsx("flex h-full items-center", pathname === '/server-comp' && 'border-b-3 border-indigo-500')}>
            <Link href="/server-comp">Server Comp</Link>
          </span>
        </div>
        <div className="flex gap-3 h-full items-center px-4">
          <span className="flex h-full items-center">
            <Link
              href="/panel/login"
              className="bg-gray-800 text-white font-semibold rounded-md px-4 py-2"
            >
              Login
            </Link>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default WebsiteHeader;