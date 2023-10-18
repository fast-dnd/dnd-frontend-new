"use client";

import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";

import { cn } from "@/utils/style-utils";

import GoogleLoginButton from "./components/google-login-button";
import useLogin from "./hooks/use-login";
import useSlides from "./hooks/use-slides";
import { slides } from "./utils/slides";

const Login = () => {
  const [current, setCurrent] = useSlides();

  const { mutate: login } = useLogin();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => login({ credential: tokenResponse.access_token }),
  });

  return (
    <div className="flex h-full items-end justify-center">
      <div className="absolute inset-0 z-[-5] flex h-full w-full bg-gradient-to-b from-black via-black/10 via-35% to-black" />
      <div className={`absolute inset-0 -z-10 h-full w-full`}>
        <div
          className="flex h-full w-[300%] overflow-hidden transition duration-300 ease-out"
          style={{
            transform: `translateX(-${(100 * current) / 3}%)`,
          }}
        >
          {slides.map((slide) => (
            <div key={slide.image} className="flex h-full w-1/3">
              <Image
                src={slide.image}
                alt={slide.description}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full object-cover"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-16 pb-24">
        <div className="relative w-full">
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className={cn(
                "absolute bottom-0 flex w-full flex-col items-center gap-4 opacity-0 blur-xl transition-all duration-500 ease-out",
                current === i && "opacity-100 blur-none",
              )}
            >
              <p className="text-center text-5xl font-light tracking-[6.72px]">
                {slide.headerStart} <br />
                <span className="whitespace-nowrap font-bold">{slide.headerEnd}</span>
              </p>
              <p className="w-[550px] text-center text-xl tracking-widest">{slide.description}</p>
            </div>
          ))}
        </div>

        <div className="nozoom">
          <GoogleLoginButton />
        </div>
        {/* <Button
          variant="google"
          className="mt-12 w-fit gap-2 px-6 py-5"
          onClick={() => googleLogin()}
        >
          <FcGoogle />
          LOG IN WITH GOOGLE
        </Button> */}
        <div className="flex gap-3">
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
