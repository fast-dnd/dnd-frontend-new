import NextTopLoader from "nextjs-toploader";

import Providers from "@/lib/providers";
import { lexend } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import "@/styles/tailwind.css";
import "@/styles/wallet.css";
import "@/styles/zoom.css";

import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

import HotjarAnalytics from "@/components/hotjar-analytics";
import Navbar from "@/components/navbar";
import { env } from "@/utils/env.mjs";

import Background from "../components/background";

export const metadata: Metadata = {
  metadataBase: new URL("https://play.v3rpg.com/"),
  title: "v3RPG",
  description: "Bringing gamification to storytelling.",
  icons: {
    icon: "/v3dnd-logo.svg",
  },
  openGraph: {
    images: ["/images/og-logo.png"],
    title: "v3RPG",
    description: "Bringing gamification to storytelling.",
  },
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>

      <HotjarAnalytics />

      <body className={cn("flex flex-col overflow-auto bg-dark-900", lexend.className)}>
        <Providers>
          <NextTopLoader />
          <Background />
          <div className="flex h-full flex-1 flex-col lg:max-h-full lg:px-16">
            <Navbar />

            {children}
          </div>
        </Providers>

        <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM_ID} />
      </body>
    </html>
  );
};

export default RootLayout;
