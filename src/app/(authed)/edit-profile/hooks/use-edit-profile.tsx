import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import accountService from "@/services/account-service";

const useEditProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: accountService.editAccount,
    onSuccess: (_data) => {
      router.push("/profile");
      toast.success("Profile updated successfully!");
    },
  });
};

export default useEditProfile;
