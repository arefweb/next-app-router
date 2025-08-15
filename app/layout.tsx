import QueryProvider from '@/shared/services/query/QueryProvider';
import "./globals.css";
import { MSWProvider } from "./msw-provider";
import DevButton from "@/shared/components/dev-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MSWProvider>
      <QueryProvider>
        {children}
        <DevButton />
      </QueryProvider>
    </MSWProvider>
  );
}
