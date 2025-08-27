import React from 'react';
import WebsiteHeader from "@/shared/components/website-header";

function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <WebsiteHeader />
      {children}
    </div>
  );
}

export default WebsiteLayout;