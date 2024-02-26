import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import Lottie from "react-lottie";
import { toast } from "sonner";
import { useIsClient, useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { jibril } from "@/utils/fonts";
import animationData from "@/utils/lotties/coin-animation.json";

const ShowPaymentModal = () => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isClient = useIsClient();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!isClient) return;

    const payment = searchParams.get("payment");
    const _amount = searchParams.get("amount");

    if (!payment) return;

    if (_amount) setAmount(parseInt(_amount));

    if (payment === "success") setOpen(true);
    else if (payment === "cancel") toast.error("Payment cancelled");

    const timeout = setTimeout(() => router.replace(pathname), 1000);

    return () => clearTimeout(timeout);
  }, [isClient, pathname, router, searchParams]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setOpen(false);
      }}
    >
      <DialogContent
        className="flex flex-col gap-4 bg-black p-4 shadow-none outline-none max-lg:inset-0 max-lg:size-full max-lg:max-w-full max-lg:translate-x-0 max-lg:translate-y-0 max-lg:overflow-y-auto max-lg:rounded-none max-lg:pt-20 max-lg:data-[state=closed]:duration-500 max-lg:data-[state=open]:duration-500 lg:justify-center lg:gap-6 lg:bg-transparent lg:p-0"
        fromBottom={isMobileTablet}
      >
        <div className="pointer-events-none absolute -top-10 flex w-full justify-end max-lg:hidden">
          <DialogClose className="pointer-events-auto">
            <AiOutlineClose size={20} />
          </DialogClose>
        </div>
        <div className="relative flex flex-col items-center justify-between gap-2 rounded-lg p-3 max-lg:h-full lg:gap-9 lg:bg-dark-900 lg:p-6">
          <div className="pointer-events-none">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={316}
              width={563}
            />
          </div>

          <div className="relative flex w-96 max-w-full flex-col items-center justify-end gap-2 text-xl max-lg:h-full">
            You have purchased
            <p
              className="mt-1 bg-gradient-to-r from-[#FBBC05] from-5% via-[#977000] via-70% to-[#473500] to-95% bg-clip-text text-5xl uppercase text-transparent"
              style={jibril.style}
            >
              {amount}
            </p>
            Tokens
          </div>

          <DialogClose>
            <Button className="whitespace-nowrap px-8 py-3 uppercase max-lg:w-52">
              START PLAYING
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowPaymentModal;
