import dndService from "@/services/dnd-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useUpdateAvatar = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: dndService.updateAvatar,
    onSuccess: (_data) => {
      router.push("/home");
      toast.success("Avatar updated successfully!");
    },
  });
};

export default useUpdateAvatar;
