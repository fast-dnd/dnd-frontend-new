import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import kingdomService from "@/services/kingdom-service";

const useUpdateAvatar = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: kingdomService.updateAvatar,
    onSuccess: (_data) => {
      router.push("/home");
      toast.success("Avatar updated successfully!");
    },
  });
};

export default useUpdateAvatar;
