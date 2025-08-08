"use client";

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from 'clsx';

function Header() {
  const pathname = usePathname();
  return (
    <div>
      <nav className="flex border-b-1 border-b-blue-800">
        <span className={clsx("p-4", pathname === '/' && 'border-b-2 border-indigo-500')}>
          <Link href="/">Home</Link>
        </span>
        <span className={clsx("p-4", pathname === '/about' && 'border-b-2 border-indigo-500')}>
          <Link href="/about">About</Link>
        </span>
        <span className={clsx("p-4", pathname === '/server-comp' && 'border-b-2 border-indigo-500')}>
          <Link href="/server-comp">Server Comp</Link>
        </span>
      </nav>
    </div>
  );
}

export default Header;