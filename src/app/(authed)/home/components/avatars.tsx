import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

import { cn } from "@/utils/style-utils";
import { useGetKingdom } from "@/hooks/use-get-kingdom";
import Skeleton from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";

const Avatars = () => {
  const { data: kingdom, isLoading } = useGetKingdom();
  const router = useRouter();
  const [loadingEdit, setLoadingEdit] = useState("");

  if (isLoading) return <Skeleton />;

  if (!kingdom) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  if (!kingdom.avatars || kingdom.avatars.length === 0) router.push("/create-avatar");

  // TODO: avatar exp % (currently set at 80)
  return (
    <div className="no-scrollbar flex h-full flex-col gap-4 overflow-y-auto">
      {kingdom.avatars.map((avatar) => (
        <div
          key={avatar._id}
          className="flex flex-row items-center gap-6 rounded-md p-2 transition-colors duration-300 hover:bg-white/5"
        >
          <Image
            src={avatar.imageUrl || "/images/default-avatar.png"}
            alt="avatar"
            width={96}
            height={96}
            className="h-16 w-16 lg:h-24 lg:w-24"
          />
          <div className="flex flex-col justify-center gap-1">
            <p className="uppercase tracking-wider lg:text-2xl lg:tracking-[0.07em]">
              {avatar.name}
            </p>
            <div className="flex items-center justify-center gap-4 lg:flex-col lg:items-start lg:justify-start lg:gap-1">
              <div className="flex flex-row items-center gap-4">
                <p className="whitespace-nowrap text-sm font-light tracking-[0.15em] lg:text-xl">
                  Level {avatar.level}
                </p>
                <div className="h-2 w-2 rotate-45 bg-white/25" />
                <div className="flex flex-row gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-3 w-1.5 bg-tomato lg:h-3.5 lg:w-2.5",
                        (i + 1) * 20 > 80 && "opacity-20",
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="h-2 w-2 rotate-45 bg-white/25 lg:hidden" />

              <div
                className="flex w-fit cursor-pointer items-center gap-2 bg-white/10 px-2 py-1.5 lg:px-3 lg:py-2"
                onClick={() => {
                  setLoadingEdit(avatar._id);
                  router.push(`/create-avatar/${avatar._id}`);
                }}
              >
                {loadingEdit === avatar._id && <Spinner className="m-0" />}
                {loadingEdit !== avatar._id && <MdEdit />}
                <p className="hidden lg:block">EDIT</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Avatars;
