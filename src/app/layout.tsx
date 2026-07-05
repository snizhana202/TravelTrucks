import TanstackProvider from "@/providers/TanstackProvider";
import Header from "@/components/Header/Header";
import "./globals.css";

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
