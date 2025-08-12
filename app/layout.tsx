import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIN Generation",
  description: "This website was created temporarily for collection TIN for staff with missing Salary for the Month of July 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
       <ThemeProvider
       defaultTheme="system"
       enableSystem
       >

         <ReactQueryProvider>
          {children}
          <Toaster/>
        </ReactQueryProvider>
       </ThemeProvider>
      </body>
    </html>
  );
}
