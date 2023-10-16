"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import useLogin from "./hooks/use-login";

const Login = () => {
  const slides = ["/images/login-bg-1.png", "/images/login-bg-2.png", "/images/login-bg-3.png"];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const { mutate: login } = useLogin();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => login({ credential: tokenResponse.access_token }),
  });

  return (
    <div className="flex h-full items-end justify-center">
      <div className="absolute inset-0 z-[-5] flex h-full w-full bg-loginGradient" />
      <div className={`absolute inset-0 -z-10 flex h-full w-full`}>
        <div
          className="flex h-full w-full overflow-hidden transition duration-300 ease-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((s) => (
            <Image
              src={s}
              key={s}
              alt={s}
              fill
              priority
              quality={100}
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 pb-24">
        <p className="text-center text-5xl font-light tracking-[6.72px]">
          GET CHALLENGED BY <br />
          <span className="font-bold">AI AS A DUNGEON MASTER</span>
        </p>
        <p className="w-[550px] text-center text-xl tracking-widest">
          Our smart AI buddy will start things off by setting the scene. You might be in a spooky
          castle, a busy city, or even outer space!
        </p>
        {/* <GoogleLoginButton /> */}
        <Button
          variant="google"
          className="mt-12 w-fit gap-2 px-6 py-5"
          onClick={() => googleLogin()}
        >
          <FcGoogle />
          LOG IN WITH GOOGLE
        </Button>
        <div className="mt-12 flex gap-3">
          {slides.map((_, i) => {
            return (
              <button
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                key={"Slide" + i}
                className={cn(
                  "h-1.5 w-20 rounded-md bg-white/25 transition-all duration-200 hover:bg-white/60 active:bg-white/90",
                  i === current && "bg-primary hover:bg-primary active:bg-primary",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Login;
