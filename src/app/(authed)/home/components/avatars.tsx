import { useRouter } from "next/navigation";

import { useGetKingdom } from "@/hooks/use-get-kingdom";
import Skeleton from "@/components/ui/skeleton";

import Avatar from "./avatar";

const Avatars = () => {
  const { data: kingdom, isLoading } = useGetKingdom();
  const router = useRouter();

  if (isLoading) return <Skeleton />;

  if (!kingdom) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  // if (!kingdom.avatars || kingdom.avatars.length === 0) router.push("/create-avatar");

  return (
    <div className="no-scrollbar flex h-full flex-col gap-4 overflow-y-auto">
      {kingdom.avatars.map((avatar) => (
        <Avatar key={avatar._id} avatar={avatar} />
      ))}
    </div>
  );
};

export default Avatars;
