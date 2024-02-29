import { Gift } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import useCommunity from "@/hooks/helpers/use-community";
import { jibril } from "@/utils/fonts";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import Web2 from "./components/web2";
import Web3 from "./components/web3";

const ClaimRewardModal = () => {
  const { isDefault } = useCommunity();

  return (
    <Dialog>
      <DialogTrigger asChild className="max-lg:hidden">
        <button className="flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black p-4 transition-all duration-200 hover:bg-[#1B1B1B]">
          <Gift size={32} />
        </button>
      </DialogTrigger>
      <DialogTrigger asChild className="lg:hidden">
        <Button className="gap-4 py-4" variant="sidebar">
          <Gift className="size-5 shrink-0 fill-white" />
          <p className="flex-1 text-center">claim reward</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-lg uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              {isDefault ? "Reedem your coupon" : "CLAIM REWARDS"}
            </p>
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
          </div>
          <p className="ml-2 text-center font-light lg:text-xl lg:tracking-[1.5px]">
            {isDefault ? (
              <>
                Enter coupon coude to redeem <span className="font-bold">rewards</span>
              </>
            ) : (
              "You can claim the following rewards:"
            )}
          </p>
        </div>

        {isDefault ? <Web2 /> : <Web3 />}
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardModal;
