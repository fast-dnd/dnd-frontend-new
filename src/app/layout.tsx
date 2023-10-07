import NextTopLoader from "nextjs-toploader";

import Providers from "@/lib/providers";
import { jost } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import "@/styles/zoom.css";
import "@smastrom/react-rating/style.css";

import { Metadata } from "next";

import Background from "../components/background";

export const metadata: Metadata = {
  title: "v3RPG",
  description: "Bringing gamification to storytelling. Powered by AI.",
  icons: {
    icon: "/v3dnd-logo.svg",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn("flex flex-col", jost.className)}>
        <Providers>
          <NextTopLoader />
          <Background />
          <div className="flex flex-1 flex-col px-16 lg:max-h-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
