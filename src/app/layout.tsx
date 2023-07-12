import Image from "next/image";

import Providers from "@/lib/providers";
import { jost } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";
import Navbar from "@/components/navbar";

import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import "@/styles/zoom.css";

export const metadata = {
  title: "v3RPG",
  description: "AI-powered D&D game",
  icons: {
    icon: "/v3dnd-logo.svg",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn("flex flex-col", jost.className)}>
        <Providers>
          <div className="absolute -z-10 h-full w-full">
            <Image src="/images/bg-cover.png" fill quality={100} alt="bg-cover" />
          </div>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
