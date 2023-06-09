import dndService from "@/services/dndService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
