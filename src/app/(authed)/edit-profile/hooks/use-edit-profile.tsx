import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import accountService, { accountKey } from "@/services/account-service";

const useEditProfile = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: accountService.editAccount,
    onSuccess: (_data) => {
      router.push("/profile");
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries([accountKey]);
    },
  });
};

export default useEditProfile;
