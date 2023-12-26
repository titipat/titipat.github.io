"use client";

import { usePathname } from "next/navigation";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { useEffect } from "react";

const font = Open_Sans({ subsets: ["latin"], display: "block" });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    window.location = `https://titipat.net${pathname}`;
  });
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
