import Image from "next/image";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { jibril } from "@/utils/fonts";

import useCreateCheckout from "../hooks/use-create-checkout";
import useGetProducts from "../hooks/use-get-products";

const ShopModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { data: products } = useGetProducts();

  const { mutate: createCheckout, isLoading } = useCreateCheckout();

  const isMobileTablet = useMediaQuery("(max-width: 1024px)");

  const offers = [
    {
      tokenAmount: "100",
      priceId: products?.products.find((product) => product.name === "100")?.default_price,
      price: 1,
      image: (
        <Image
          src={"/images/coins-small.png"}
          alt="coins-small"
          width={172}
          height={83}
          className="z-10 mb-2 aspect-auto shrink-0 max-lg:w-[108px]"
        />
      ),
    },
    {
      tokenAmount: "550",
      priceId: products?.products.find((product) => product.name === "550")?.default_price,
      price: 5,
      image: (
        <Image
          src={"/images/coins-medium.png"}
          alt="coins-small"
          width={188}
          height={106}
          className="z-10 aspect-auto shrink-0 max-lg:w-[119px]"
        />
      ),

      discount: 10,
    },
    {
      tokenAmount: "1200",
      priceId: products?.products.find((product) => product.name === "1200")?.default_price,
      price: 10,
      image: (
        <Image
          src={"/images/coins-large.png"}
          alt="coins-small"
          width={258}
          height={144}
          className="z-10 aspect-auto shrink-0 max-lg:w-[149px]"
        />
      ),

      discount: 20,
    },
  ];

  const onCreateCheckout = async (tokenAmount: string) => {
    const priceId = offers.find((offer) => offer.tokenAmount === tokenAmount)?.priceId;
    if (!priceId) return;

    createCheckout(
      { priceId, quantity: 1 },
      { onSuccess: (data) => router.push(data.session.url) },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setOpen(false);
      }}
    >
      <DialogContent
        fromBottom={isMobileTablet}
        className="flex flex-col gap-4 bg-black p-4 shadow-none outline-none max-lg:inset-0 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:translate-x-0 max-lg:translate-y-0 max-lg:overflow-y-auto max-lg:rounded-none max-lg:pt-20 max-lg:data-[state=closed]:duration-500 max-lg:data-[state=open]:duration-500 lg:flex-row lg:justify-center lg:gap-6 lg:bg-transparent lg:p-0"
      >
        <div className="pointer-events-none absolute -top-10 flex w-full justify-between max-lg:hidden">
          <p className="text-xl font-bold uppercase">Purchase tokens</p>
          <DialogClose className="pointer-events-auto">
            <AiOutlineClose size={20} />
          </DialogClose>
        </div>
        <p className="uppercase lg:hidden">Purchase tokens</p>
        {offers.map((offer) => (
          <div
            key={offer.tokenAmount}
            className="relative flex flex-col items-center gap-2 rounded-lg bg-dark-900 p-3 lg:gap-9 lg:p-6"
          >
            {!!offer.discount && (
              <div className="absolute right-1.5 top-1.5 rounded-lg border border-[#7c692e] bg-rewardGradient p-2 lg:right-3 lg:top-3">
                <p className="h-3 font-medium leading-[14px]">{offer.discount}% FREE</p>
              </div>
            )}

            <div className="flex w-full items-center gap-4 lg:mt-6 lg:flex-col lg:gap-8">
              <div className="relative flex h-[78px] w-[88px] flex-col items-center lg:h-[170px] lg:w-full">
                <div className="absolute h-[170px] w-[170px] rounded-full bg-dark-800 max-lg:hidden" />
                <div className="absolute h-[69px] w-[69px] rounded-full bg-coinRadialGradient opacity-50 max-lg:-left-0.5 max-lg:-top-2 lg:h-[109px] lg:w-[109px] " />
                <div className="absolute flex h-full w-40 items-center justify-end max-lg:right-0 lg:inset-0 lg:w-full lg:justify-center">
                  {offer.image}
                </div>
              </div>
              <div className="flex flex-col gap-1 lg:items-center lg:gap-1.5">
                <p className="h-7 text-3xl lg:h-12 lg:text-6xl" style={jibril.style}>
                  {offer.tokenAmount}
                </p>

                <p className="font-light leading-none lg:text-xl">Tokens</p>
              </div>
            </div>

            <Button
              className="max-lg:leading-none lg:w-64"
              onClick={() => onCreateCheckout(offer.tokenAmount)}
              disabled={isLoading}
            >
              ${offer.price}
            </Button>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default ShopModal;
