"use client";

import Script from "next/script";

export default function HotjarAnalytics({ HJID, HJSV }: { HJID: string; HJSV: string }) {
  return (
    <>
      <Script
        id="hotjar-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${HJID},hjsv:${HJSV}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `,
        }}
      />
    </>
  );
}
