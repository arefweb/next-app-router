'use client';

import React from 'react';

function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no">
      <body>
        {children}
      </body>
    </html>
  );
}

export default PanelLayout;