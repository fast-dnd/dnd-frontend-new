import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";
import { useIsClient, useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { jibril } from "@/utils/fonts";

const ShowPaymentModal = () => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isClient = useIsClient();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const payment = searchParams.get("payment");

    if (!payment) return;

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
        className="z-[100] flex flex-col bg-[#1D1D1C] p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8"
        fromBottom={isMobileTablet}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="relative mt-44 flex w-96 flex-col items-center justify-center gap-2 text-xl">
            <Image
              src="/images/payment-modal-animation.png"
              alt="reward animation"
              width={316}
              height={563}
              className="absolute bottom-[-80%] right-[10%] z-[-5] h-[563px] w-[316px]"
            />
            You have purchased
            <p
              className="mt-1 bg-gradient-to-r from-[#FBBC05] from-5% via-[#977000] via-70% to-[#473500] to-95% bg-clip-text text-lg uppercase text-transparent lg:text-5xl"
              style={jibril.style}
            >
              100
            </p>
            Tokens
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button className="whitespace-nowrap px-8 py-3 uppercase max-lg:w-52">
              START PLAYING
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowPaymentModal;
