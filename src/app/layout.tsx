import { Jost } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { jost } from "@/utils/fonts";
import Providers from "@/lib/providers";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "v3RPG",
  description: "AI-powered D&D game",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Providers>
          <div className="absolute -z-10 w-full h-full">
            <Image src="/images/bg-cover.png" fill quality={100} alt={""} />
          </div>
          <Navbar />
          {children}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
