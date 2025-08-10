'use client';

import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cyan-500 flex flex-col">
      {children}
    </div>
  );
}

export default AuthLayout;