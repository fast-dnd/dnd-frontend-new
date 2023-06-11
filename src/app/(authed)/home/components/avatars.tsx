import { IKingdom } from "@/services/dnd-service";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useGetKingdom } from "../hooks/use-get-home-data";
import Spinner from "@/components/ui/spinner";
import Skeleton from "@/components/ui/skeleton";

interface IKingdomProps {
  kingdom: IKingdom;
}

const Avatars = () => {
  const { data: kingdom, isLoading } = useGetKingdom();

  if (isLoading) {
    return <Skeleton />;
  }

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
        <div key={avatar._id} className="flex flex-row items-center gap-6">
          <Image
            src={avatar.image || "/images/bg-cover.png"}
            alt="avatar"
            width={64}
            height={64}
            className="h-16"
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Avatars;
