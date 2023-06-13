import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Settings = () => {
  const router = useRouter();
  const onSignOut = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };

  return (
    <div className="flex justify-center w-[450px] h-fit">
      <Box title="ACCOUNT" className="flex flex-col flex-1 min-h-0 h-fit w-[450px] gap-8 p-8">
        <p className="text-center text-white/60 text-2xl">a@a.com</p>
        <Button variant="outline" onClick={onSignOut}>
          SIGN OUT
        </Button>
        <Button variant="primary">DELETE ACCOUNT</Button>
      </Box>
    </div>
  );
};

export default Settings;
