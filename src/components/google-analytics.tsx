"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { env } from "@/utils/env.mjs";

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    window.gtag("config", env.NEXT_PUBLIC_GTM_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
