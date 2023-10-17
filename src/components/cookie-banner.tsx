/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { cn } from "@/utils/style-utils";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(false);

  const [storedCookieConsent, setStoredCookieConsent] = useLocalStorage<boolean | null>(
    "cookie_consent",
    null,
  );

  useEffect(() => {
    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setStoredCookieConsent(cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 w-full items-center justify-center border-t border-white bg-neutral-900 py-6",
        cookieConsent !== null ? "hidden" : "flex",
      )}
    >
      <div className="flex w-2/3 min-w-fit justify-between gap-20">
        <div className="flex items-center gap-8">
          <div className="h-2 w-2 rotate-45 bg-white" />
          <div className="tracking-wide">
            <Link href="/info/cookies" className="font-bold">
              We use cookies to enhance your browsing experience.
            </Link>
            <br />
            By clicking `Allow` you agree to the use of cookies.
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-4">
            <button
              className="rounded border-2 border-white bg-white px-6 py-2 text-center text-xs font-bold uppercase leading-[18px] tracking-wide text-neutral-900"
              onClick={() => setCookieConsent(true)}
            >
              Allow Cookies
            </button>

            <button
              className="rounded border-2 border-white px-6 py-2 text-xs font-bold uppercase leading-[18px] tracking-wide"
              onClick={() => setCookieConsent(false)}
            >
              Decline Cookies
            </button>
          </div>
          <div className="h-2 w-2 rotate-45 bg-white" />
        </div>
      </div>
    </div>
  );
}
