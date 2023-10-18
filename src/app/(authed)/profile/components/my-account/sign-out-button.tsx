import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { logout } from "@/utils/auth";

const SignOutButton = () => {
  const onSignOut = () => {
    logout();
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
