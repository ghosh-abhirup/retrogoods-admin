import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Main from "@/components/common/Main";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

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
      <body className={`${geistSans.variable} antialiased`}>
        <div className="w-full mx-auto font-geist">
          <Main children={children} />
        </div>
      </body>
    </html>
  );
}
