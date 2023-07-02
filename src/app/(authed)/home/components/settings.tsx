import BoxSkeleton from "@/components/BoxSkeleton";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useGetAccount from "../hooks/use-get-account";

const Settings = () => {
  const router = useRouter();
  const onSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("accountId");
    router.push("/login");
  };

  const { data: account, isLoading } = useGetAccount();

  if (!account || isLoading) return <BoxSkeleton title="Account" />;

  return (
    <div className="flex justify-center md:w-[450px] h-fit">
      <Box title="ACCOUNT" className="flex flex-col flex-1 min-h-0 h-fit md:w-[450px] gap-8 p-8">
        <p className="text-center text-white/60 text-2xl break-all">{account.properties.email}</p>
        <Button variant="outline" onClick={onSignOut}>
          SIGN OUT
        </Button>
      </Box>
    </div>
  );
};

export default Settings;
