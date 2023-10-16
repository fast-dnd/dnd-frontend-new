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
        "fixed inset-x-0 bottom-0 mx-auto my-10 flex max-w-max flex-col items-center justify-between gap-4 rounded-lg bg-gray-700 p-3 shadow sm:flex-row md:max-w-screen-sm md:px-4",
        cookieConsent !== null ? "hidden" : "flex",
      )}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p>
            We use <span className="font-bold text-sky-400">cookies</span> on our site.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          className="rounded-md border-gray-900 px-5 py-2 text-gray-300"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="rounded-lg bg-gray-900 px-5 py-2 text-white"
          onClick={() => setCookieConsent(true)}
        >
          Allow Cookies
        </button>
      </div>
    </div>
  );
}
