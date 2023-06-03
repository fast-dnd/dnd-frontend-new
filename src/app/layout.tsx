import { Jost } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { jost } from "@/utils/fonts";

export const metadata = {
  title: "v3RPG",
  description: "AI-powered D&D game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <div className="absolute -z-10 w-full h-full">
          <Image src="/images/bg-cover.png" fill quality={100} alt={""} />
        </div>
        {children}
      </body>
    </html>
  );
}
