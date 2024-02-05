import NextTopLoader from "nextjs-toploader";

import Providers from "@/lib/providers";
import { lexend } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import "@/styles/autofill-input.css";
import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import "@/styles/tailwind.css";
import "@/styles/zoom.css";
import "@/styles/content-editable.css";

import { Metadata } from "next";

import Background from "@/components/common/background";
import CookieBanner from "@/components/common/cookie-banner";
import GoogleAnalytics from "@/components/common/google-analytics";
import HotjarAnalytics from "@/components/common/hotjar-analytics";
import DesktopNavbar from "@/components/navbar/desktop-navbar";
import { env } from "@/utils/env.mjs";

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
  manifest: "/manifest.json",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#FF5A5A" />
        <meta
          name="robots"
          content={env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "all" : "noindex,nofollow"}
        />
      </head>

      <HotjarAnalytics />
      <GoogleAnalytics />

      <body className={cn("flex flex-col overflow-auto bg-dark-900", lexend.className)}>
        <Providers>
          <NextTopLoader />
          <Background />
          <div className="flex h-full flex-1 flex-col lg:max-h-full lg:px-16">
            <DesktopNavbar />

            {children}
            <CookieBanner />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
