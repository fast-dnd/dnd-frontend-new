import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import dndService from "@/services/dnd-service";

const useCreateAvatar = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: dndService.createAvatar,
    onSuccess: (_data) => {
      router.push("/home");
      toast.success("Avatar created successfully!");
    },
  });
};

export default useCreateAvatar;
