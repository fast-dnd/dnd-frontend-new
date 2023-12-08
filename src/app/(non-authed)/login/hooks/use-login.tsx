import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import authService from "@/services/auth-service";

const useLogin = () => {
  const router = useRouter();

  const [_, setJwtToken] = useLocalStorage("jwtToken", "");

  const defaultCommunityId = useReadLocalStorage<string>("defaultCommunityId");
  const [__, setCommunityId] = useLocalStorage("communityId", "");

  const redirectURL = useReadLocalStorage<string>("redirectURL");
  const redirectTo = redirectURL ?? "/home";

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      router.push(redirectTo);
      localStorage.removeItem("redirectURL");
      setJwtToken(data.data.jwtToken);
      setCommunityId(defaultCommunityId ?? "");
      toast.success("Logged in successfully!");
    },
  });
};

export default useLogin;
