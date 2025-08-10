import React from 'react';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-100">
      {children}
    </div>
  );
}

export default DashboardLayout;