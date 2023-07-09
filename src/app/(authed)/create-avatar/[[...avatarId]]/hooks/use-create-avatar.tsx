import { useRouter } from "next/navigation";
import dndService from "@/services/dnd-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
