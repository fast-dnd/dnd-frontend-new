import Skeleton from "@/components/ui/skeleton";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useGetKingdom } from "../hooks/use-get-home-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";

const Avatars = () => {
  const { data: kingdom, isLoading } = useGetKingdom();
  const router = useRouter();

  if (isLoading) return <Skeleton />;

  if (!kingdom) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-5xl">Something went wrong</div>
      </div>
    );
  }

  // TODO: avatar exp % (currently set at 80)
  return (
    <div className="h-full flex flex-col gap-8 overflow-y-auto no-scrollbar">
      {kingdom.avatars.map((avatar) => (
        <div key={avatar._id} className="flex flex-row items-center gap-6 hover:bg-white/5 p-2">
          <Image
            src={avatar.imageUrl || "/images/default-avatar.png"}
            alt="avatar"
            width={96}
            height={96}
            className="h-24 w-24"
          />
          <div className="flex flex-col justify-center gap-1">
            <p className="text-2xl tracking-[0.07em] uppercase">{avatar.name}</p>
            <div className="flex flex-row items-center gap-4">
              <p className="text-xl tracking-[0.15em] font-light">Level {avatar.level}</p>
              <div className="h-2 w-2 rotate-45 bg-white/25" />
              <div className="flex flex-row gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={cn("w-2.5 h-3.5 bg-tomato", (i + 1) * 20 > 80 && "opacity-20")}
                  />
                ))}
              </div>
            </div>
            <div
              className="cursor-pointer px-3 py-2 items-center bg-white/10 w-fit flex gap-2"
              onClick={() => router.push(`/create-avatar/${avatar._id}`)}
            >
              <MdEdit />
              EDIT
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Avatars;
