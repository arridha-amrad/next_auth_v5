import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../styles/globals.css";
import clsx from "clsx";
import { ThemeProvider } from "~/components/theme-provider";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/toaster";

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "min-h-screen bg-background py-4 font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="h-10" />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
