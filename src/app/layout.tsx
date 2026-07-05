import TanstackProvider from "@/providers/TanstackProvider";
import Header from "@/components/Header/Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Rent modern campers for unforgettable adventures. Choose your home on wheels today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen h-full">
        <div id="portal-root"></div>
        <TanstackProvider>
          <Header />
          <main className="flex-grow w-full h-full">{children}</main>
        </TanstackProvider>
      </body>
    </html>
  );
}
