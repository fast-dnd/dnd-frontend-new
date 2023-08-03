import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import BoxSkeleton from "@/components/box-skeleton";

import useGetAccount from "../hooks/use-get-account";

const Settings = () => {
  const router = useRouter();

  const onSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("accountId");
    router.push("/login");
  };

  const { data: account, isLoading } = useGetAccount();

  if (isLoading) return <BoxSkeleton title="Account" />;

  if (!account) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex h-fit justify-center lg:w-[450px]">
      <Box title="ACCOUNT" className="flex h-fit min-h-0 flex-1 flex-col gap-4 p-8 lg:w-[450px]">
        <p className="inline-flex items-center justify-center text-lg leading-7">
          DM coin ballance:
          <Image src="/images/dm-coin.png" alt="dm-coin" height={30} width={30} className="" />
          <span className="font-medium"> {account.coins}</span>
        </p>
        <p className="inline-flex items-center justify-center text-lg leading-7">
          DM currency ballance:
          <Image src="/images/dm-coin.png" alt="dm-coin" height={30} width={30} className="" />
          <span className="font-medium"> {account.dmCurrency}</span>
        </p>
        <p className="break-all text-center text-xl text-white/60">{account.properties.email}</p>
        <Button variant="outline" onClick={onSignOut}>
          SIGN OUT
        </Button>
      </Box>
    </div>
  );
};

export default Settings;
