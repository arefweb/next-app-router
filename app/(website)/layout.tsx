import React from 'react';
import WebsiteHeader from "@/shared/components/website-header";
import WebsiteFooter from "@/shared/components/website-footer";

function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <WebsiteHeader />
      {children}
      <WebsiteFooter />
    </div>
  );
}

export default WebsiteLayout;