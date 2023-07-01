"use client";

import HowToPlay from "@/components/how-to-play";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useMediaQuery from "@/hooks/use-media-query";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";
import { useRouter } from "next/navigation";
import { MdMenu } from "react-icons/md";
import AddDungeon from "./components/add-dungeon";
import Avatars from "./components/avatars";
import Dungeons from "./components/dungeons";
import useGetAccount from "./hooks/use-get-account";
import { useHomeStore } from "./stores/tab-store";
import { homeTabs } from "./types/home";
import CreateRoom from "./components/create-room";
import GameHistory from "./components/game-history";
import JoinRoom from "./components/join-room";
import Tabs from "./components/tabs";
import Settings from "./components/settings";

const Home = () => {
  const router = useRouter();
  const { homeTab, setHomeTab, displayHowToPlay, setDisplayHowToPlay } = useHomeStore(
    (state) => state,
  );

  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  const { data: account } = useGetAccount();

  return (
    <div className="flex flex-col w-full min-h-0 h-full md:px-16 md:pb-12 overflow-y-auto">
      <MobileNavbar />

      <div className="hidden md:flex items-center justify-center my-6">
        <Tabs homeOrDungeons="home" selectedTab={homeTab} />
      </div>

      {displayHowToPlay && (
        <HowToPlay onHideHowToPlay={() => setDisplayHowToPlay(false)} hideText="Go back" />
      )}

      <div
        className={cn(
          "px-5 md:px-0 flex flex-col md:flex-row flex-1 md:min-w-fit min-h-0 h-full gap-12 overflow-y-auto",
          homeTab !== "PLAY" && "hidden",
        )}
      >
        <Box title="CREATE ROOM" className="flex flex-col min-h-0 flex-1 gap-4 p-4 md:gap-8 md:p-8">
          <CreateRoom />
        </Box>
        <div className="flex flex-col flex-1 basis-1/3 h-full md:min-w-fit gap-12">
          <JoinRoom />
          <div className="flex flex-1 min-h-0 overflow-y-auto">
            <Box
              title="GAME HISTORY"
              className="flex flex-col items-start min-h-0 flex-1 gap-4 p-4 md:gap-8 md:p-8 mb-4 md:mb-0"
            >
              <GameHistory />
            </Box>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "px-5 md:px-0 flex flex-col md:flex-row flex-1 md:min-w-fit min-h-0 h-full gap-12 overflow-y-auto",
          homeTab !== "MY KINGDOM" && "hidden",
        )}
      >
        <div className="flex h-full flex-1 basis-1/4">
          <Box
            title="MY AVATARS"
            className="flex flex-col flex-1 min-h-0 gap-4 p-4 md:gap-8 md:p-8"
          >
            <Avatars />
            <Button onClick={() => router.push("/create-avatar")}>GET MORE</Button>
          </Box>
        </div>
        <div className="flex flex-1 basis-2/3">
          <Box
            title="MY DUNGEONS"
            className="flex flex-col flex-1 min-h-0 gap-4 md:gap-8 p-4 md:p-8 mb-4 md:mb-0"
          >
            <Dungeons />
            <AddDungeon />
          </Box>
        </div>
      </div>

      <div
        className={cn(
          "px-5 md:px-0 flex flex-row flex-1 justify-center min-h-0 gap-12",
          homeTab !== "SETTINGS" && "hidden",
        )}
      >
        <Settings account={account} />
      </div>
    </div>

    // <div className="flex flex-col w-full min-h-0 h-full px-16 pb-12">
    //   {displayHowToPlay ? (
    //     <HowToPlay onHideHowToPlay={() => setDisplayHowToPlay(false)} hideText="Go back" />
    //   ) : (
    //     <>
    //       <div className="flex items-center justify-center my-6">
    //         <Tabs homeOrDungeons="home" selectedTab={homeTab} />
    //       </div>

    //       <div
    //         className={cn(
    //           "flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12",
    //           homeTab !== "PLAY" && "hidden",
    //         )}
    //       >
    //         <Box title="CREATE ROOM" className="p-8 flex flex-col min-h-0 flex-1 gap-8">
    //           <CreateRoom />
    //         </Box>
    //         <div className="flex flex-col flex-1 basis-1/3 h-full min-w-fit gap-12">
    //           <JoinRoom />
    //           <div className="flex flex-1 min-h-0">
    //             <Box
    //               title="GAME HISTORY"
    //               className="flex flex-col items-start min-h-0 flex-1 px-8 pt-8 gap-8"
    //             >
    //               <GameHistory />
    //             </Box>
    //           </div>
    //         </div>
    //       </div>

    //       <div
    //         className={cn(
    //           "flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12",
    //           homeTab !== "MY KINGDOM" && "hidden",
    //         )}
    //       >
    //         <div className="flex h-full flex-1 basis-1/4">
    //           <Box title="MY AVATARS" className="flex flex-col flex-1 min-h-0 gap-8 p-8">
    //             <Avatars />
    //             <Button onClick={() => router.push("/create-avatar")}>GET MORE</Button>
    //           </Box>
    //         </div>
    //         <div className="flex flex-1 basis-2/3">
    //           <Box title="MY DUNGEONS" className="flex flex-col flex-1 min-h-0 gap-8 p-8">
    //             <Dungeons />
    //             <AddDungeon />
    //           </Box>
    //         </div>
    //       </div>
    //       <div
    //         className={cn(
    //           "flex flex-row flex-1 justify-center min-h-0 gap-12",
    //           homeTab !== "SETTINGS" && "hidden",
    //         )}
    //       >
    //         <Settings account={account} />
    //       </div>
    //     </>
    //   )}
    // </div>
  );
};
// TODO: update "my kingdom" dungeons
export default Home;

function MobileNavbar() {
  const { homeTab, setHomeTab, setDisplayHowToPlay } = useHomeStore((state) => state);
  return (
    <div className="flex justify-between py-8 px-5 md:hidden">
      <p style={jibril.style} className="text-lg font-bold text-white">
        V
      </p>
      <p className="text-lg font-medium tracking-widest uppercase">{homeTab}</p>
      <Sheet>
        <SheetTrigger>
          <MdMenu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-12 flex flex-col min-w-fit items-center gap-6">
            {homeTabs.map<React.ReactNode>((tab, index) => (
              <div
                key={tab}
                className={cn(
                  "self-end",
                  tab === homeTab && "font-extrabold border-b-2 border-tomato ",
                )}
                onClick={() => {
                  setDisplayHowToPlay(false);
                  setHomeTab(tab);
                }}
              >
                <p className="text-lg leading-7 tracking-widest whitespace-nowrap uppercase">
                  {tab}
                </p>
              </div>
            ))}
            <div className={cn("self-end")} onClick={() => setDisplayHowToPlay(true)}>
              <p className="text-lg leading-7 tracking-widest whitespace-nowrap uppercase">
                HOW TO PLAY
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
