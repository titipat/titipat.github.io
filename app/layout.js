import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const font = Open_Sans({ subsets: ["latin"], display: "block" });

export const metadata = {
  title: "Titipat.net",
  description: "I'm Titipat, full-stack web developer from Thailand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
