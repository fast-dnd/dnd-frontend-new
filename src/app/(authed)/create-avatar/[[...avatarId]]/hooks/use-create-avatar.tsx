import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import kingdomService from "@/services/kingdom-service";

const useCreateAvatar = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: kingdomService.createAvatar,
    onSuccess: (_data) => {
      router.push("/home");
      toast.success("Avatar created successfully!");
    },
  });
};

export default useCreateAvatar;
