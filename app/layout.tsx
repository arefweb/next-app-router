import QueryProvider from '@/shared/services/query/QueryProvider';
import "./globals.css";
import { MSWProvider } from "./msw-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MSWProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </MSWProvider>
  );
}
