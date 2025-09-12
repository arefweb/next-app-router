'use client';

import React, {useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {redirectToLogin} from "@/shared/functions/utils";
import {useAppDispatch, useAppSelector} from "@/shared/services/store";
import {fetchUserInfo} from "@/shared/services/store/slices/userInfoSlice";
import useFirstRender from "@/shared/functions/hooks/use-first-render";
import logout from "@/shared/functions/utils/logout";
import logo from "@/assets/images/logo.png";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(state => state.userInfo.user?.name) ?? '';
  const { isFirstRender, setIsFirstRender } = useFirstRender();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      redirectToLogin();
    }
    if (isFirstRender) {
      dispatch(fetchUserInfo());
      setIsFirstRender();
    }
  }, [dispatch, isFirstRender, setIsFirstRender]);

  return (
    <div className="min-h-dvh flex">
      <aside className="w-[250px] bg-gray-700 text-white p-4">
        <section className="flex items-center gap-1 h-[100px]">
          <Image src={logo} alt="logo" />
          <p className="text-2xl text-white">
            Cryptic
          </p>
        </section>
        <nav className="px-4">
          <Link href="/panel/my-desk" className="font-bold flex justify-between">
            <span>
              Dashboard
            </span>
            <span>
              &gt;
            </span>
          </Link>
        </nav>
      </aside>
      <main className="grow">
        <header className="flex items-center justify-between h-[60px] border border-blue-100 px-4">
          <p className="font-bold text-gray-700">
            Welcome {userName}
          </p>
          <button
            type="button"
            onClick={() => logout()}
            className="border border-gray-200 rounded-md bg-white p-2 block m-2 cursor-pointer"
          >
            Logout
          </button>
        </header>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;