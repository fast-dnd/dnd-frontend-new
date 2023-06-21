import BoxSkeleton from "@/components/BoxSkeleton";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { IAccount } from "@/types/dnd";
import { useRouter } from "next/navigation";
import React from "react";

interface ISettingsProps {
  account?: IAccount;
}

const Settings = ({ account }: ISettingsProps) => {
  const router = useRouter();
  const onSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("accountId");
    router.push("/login");
  };

  if (!account) return <BoxSkeleton title="Account" />;

  return (
    <div className="flex justify-center w-[450px] h-fit">
      <Box title="ACCOUNT" className="flex flex-col flex-1 min-h-0 h-fit w-[450px] gap-8 p-8">
        <p className="text-center text-white/60 text-2xl">{account.properties.email}</p>
        <Button variant="outline" onClick={onSignOut}>
          SIGN OUT
        </Button>
      </Box>
    </div>
  );
};

export default Settings;
