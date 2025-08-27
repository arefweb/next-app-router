'use client';

import React, {useEffect} from 'react';
import {redirectToLogin} from "@/shared/functions/utils";
import {useAppDispatch} from "@/shared/services/store";
import {fetchUserInfo} from "@/shared/services/store/slices/userInfoSlice";
import useFirstRender from "@/shared/functions/hooks/use-first-render";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
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
    <div className="bg-amber-100">
      {children}
    </div>
  );
}

export default DashboardLayout;