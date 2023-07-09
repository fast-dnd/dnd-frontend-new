import { AiFillHeart, AiOutlineLeft } from "react-icons/ai";
import { BsFillLightningFill, BsStars } from "react-icons/bs";

import { Box } from "./ui/box";

interface IHowToPlayProps {
  onHideHowToPlay?: () => void;
  hideText?: string;
}

const HowToPlay = ({ onHideHowToPlay, hideText }: IHowToPlayProps) => {
  return (
    <div className="flex flex-col gap-8 overflow-x-hidden lg:items-center lg:justify-center">
      {onHideHowToPlay && hideText && (
        <div
          className="flex cursor-pointer items-center gap-1 text-lg font-medium uppercase tracking-[0.08em]"
          onClick={onHideHowToPlay}
        >
          <AiOutlineLeft className="inline-block" /> {hideText}
        </div>
      )}
      <div className="w-fit px-5 lg:px-0">
        <Box
          title="HOW TO PLAY"
          className="mb-4 flex min-h-0 flex-1 flex-col items-start justify-center gap-5 p-5 tracking-wider lg:flex-row lg:gap-12 lg:px-12 lg:py-8"
        >
          <div className="flex flex-col gap-5 lg:w-[444px]">
            <p className="w-fit border-b border-b-tomato text-lg font-semibold uppercase tracking-widest lg:text-2xl">
              Quick guide
            </p>
            <p className="leading-6 lg:text-lg">
              🎲 The game consists of a <b>maximum of 8 turns</b>. The turns alternate between{" "}
              <b>preparation turns</b> and <b>free will turns</b>.
              <br />
              <br />
              🛡️ The preparation turn is the turn in which{" "}
              <b>you have the opportunity to manipulate the stats of your champions</b>. At this
              time you are shown what you can do, and the AI will interpret it as it sees fit for
              your adventure.
              <br />
              <br />
              🤞🏻 After selecting your action, <b>click roll and cross your fingers!</b>
              <br />
              <br />
              ✍🏻 After that turn comes the time when your creativity is most needed: the free will
              turn. <b>You can write whatever you want</b>.
              <br />
              <br />
              📜 <b>Your creativity + your role + the AI&apos;s humor</b> will propel the story
              forward
            </p>
          </div>

          <div className="hidden h-full border-l border-l-white/20 lg:block" />
          <div className="block w-full border-t border-t-white/20 lg:hidden" />

          <div className="flex flex-col lg:w-[770px]">
            <p className="w-fit border-b border-b-tomato text-lg font-semibold uppercase tracking-widest lg:text-2xl">
              Movement probabilities
            </p>
            <p className="mt-4 font-semibold lg:text-lg">PREPARATION TURNS</p>
            <p className="mt-4 lg:mt-2 lg:text-lg">
              Depending of what action you choose, the total dice value will have a different effect
              on your champion stats.
            </p>
            <div className="w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2 to 6", "7 or 8", "9 or 10", "11 or 12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/20">
                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left">
                      Try to heal yourself
                    </td>
                    {["-2", "+1", "+2", "+3"].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <p>{value}</p>
                          <AiFillHeart />
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left">
                      Try to find something useful
                    </td>
                    {["-2", "+1", "+2", "+3"].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <p>{value}</p>
                          {index === 0 ? <AiFillHeart /> : <BsStars />}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left">
                      Talk with the team
                    </td>
                    <td className="border-b border-l border-b-white/25 border-l-white/25">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p>-1</p>
                        <BsFillLightningFill />
                      </div>
                    </td>
                    <td
                      className="border-b border-l border-b-white/25 border-l-white/25"
                      colSpan={3}
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p>+1</p>
                        <BsFillLightningFill />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td className="px-3 py-2 text-left">Take a rest</td>
                    <td className="border-l border-l-white/25" colSpan={4}>
                      No effect on your stats
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-8 font-semibold lg:text-lg lg:tracking-widest">FREE WILL TURNS</p>
            <p className="mt-2 lg:text-lg">
              Despite what you decide, the total dice value will have an effect on your champion
              stats.
            </p>

            <div className="w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2 lg:table-fixed">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2 to 6", "7 to 12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/20">
                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left">
                      Try to find something useful
                    </td>
                    {["-2", "+1"].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <p>{value}</p>
                          {index === 0 ? <AiFillHeart /> : <BsStars />}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default HowToPlay;
