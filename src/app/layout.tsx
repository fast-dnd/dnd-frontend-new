import NextTopLoader from "nextjs-toploader";

import Providers from "@/lib/providers";
import { lexend } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import "@/styles/zoom.css";
import "@smastrom/react-rating/style.css";

import { Metadata } from "next";

import GoogleAnalytics from "@/components/google-analytics";
import Navbar from "@/components/navbar";

import Background from "../components/background";

export const metadata: Metadata = {
  metadataBase: new URL("https://play.v3rpg.com/"),
  title: "v3RPG",
  description: "Bringing gamification to storytelling.",
  icons: {
    icon: "/v3dnd-logo.svg",
  },
  openGraph: {
    images: ["/v3dnd-logo.png"],
    title: "v3RPG",
    description: "Bringing gamification to storytelling.",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-WR2T115S96" />
      <body className={cn("flex flex-col", lexend.className)}>
        <Providers>
          <NextTopLoader />
          <Background />
          <div className="flex flex-1 flex-col px-16 lg:max-h-full">
            <Navbar />

            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
