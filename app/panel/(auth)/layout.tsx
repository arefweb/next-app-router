import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-200 h-full">
      {children}
    </div>
  );
}

export default AuthLayout;