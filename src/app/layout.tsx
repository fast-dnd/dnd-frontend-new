import Navbar from "@/components/navbar";
import Providers from "@/lib/providers";
import { jost } from "@/utils/fonts";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { cn } from "@/utils/style-utils";

export const metadata = {
  title: "v3RPG",
  description: "AI-powered D&D game",
  icons: {
    icon: "/v3dnd-logo.png",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn("h-screen flex flex-col", jost.className)}>
        <Providers>
          <div className="absolute -z-10 w-full h-full">
            <Image
              src="/images/bg-cover.png"
              fill
              quality={100}
              alt="bg-cover"
            />
          </div>
          <Navbar />
          {children}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
