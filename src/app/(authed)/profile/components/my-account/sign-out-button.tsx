import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const onSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("accountId");
    router.push("/login");
    toast.success("Signed out successfully!");
  };

  return (
    <div className="flex flex-1 items-end justify-center">
      <Button className="w-fit" onClick={onSignOut}>
        SIGN OUT
      </Button>
    </div>
  );
};

export default SignOutButton;
