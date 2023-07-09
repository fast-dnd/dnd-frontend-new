import { useRouter } from "next/navigation";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import BoxSkeleton from "@/components/BoxSkeleton";

import useGetAccount from "../hooks/use-get-account";

const Settings = () => {
  const router = useRouter();
  const onSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("accountId");
    router.push("/login");
  };

  const { data: account, isLoading } = useGetAccount();

  if (!account || isLoading) return <BoxSkeleton title="Account" />;

  return (
    <div className="flex h-fit justify-center lg:w-[450px]">
      <Box title="ACCOUNT" className="flex h-fit min-h-0 flex-1 flex-col gap-8 p-8 lg:w-[450px]">
        <p className="break-all text-center text-2xl text-white/60">{account.properties.email}</p>
        <Button variant="outline" onClick={onSignOut}>
          SIGN OUT
        </Button>
      </Box>
    </div>
  );
};

export default Settings;
