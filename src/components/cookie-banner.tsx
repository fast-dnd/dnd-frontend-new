/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { cn } from "@/utils/style-utils";

const CookieBanner = () => {
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
        "fixed inset-x-0 bottom-0 z-50 w-full items-center justify-center border-t border-white bg-neutral-900 px-4 py-6",
        cookieConsent !== null ? "hidden" : "flex",
      )}
    >
      <div className="flex min-w-fit flex-col justify-between gap-4 lg:w-2/3 lg:flex-row lg:gap-20">
        <div className="flex items-center justify-center gap-8">
          <div className="h-2 w-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
          <div className="max-lg:text-center max-lg:text-xs lg:tracking-wide">
            <Link href="/info/cookies" className="font-bold">
              We use cookies to enhance your browsing experience.
            </Link>
            <br />
            By clicking `Allow` you agree to the use of cookies.
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 max-lg:w-full">
          <div className="flex justify-center gap-4 max-lg:w-full">
            <button
              className="rounded border border-white bg-white px-2 py-1 text-center text-xs font-bold uppercase leading-[18px] tracking-wide text-neutral-900 max-lg:w-full lg:border-2 lg:px-6 lg:py-2"
              onClick={() => setCookieConsent(true)}
            >
              Allow
              <span className="max-lg:hidden">Cookies</span>
            </button>

            <button
              className="rounded border border-white px-2 py-1 text-xs font-bold uppercase leading-[18px] tracking-wide max-lg:w-full lg:border-2 lg:px-6 lg:py-2"
              onClick={() => setCookieConsent(false)}
            >
              Decline <span className="max-lg:hidden">Cookies</span>
            </button>
          </div>
          <div className="h-2 w-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
