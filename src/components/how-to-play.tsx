import { AiFillHeart, AiOutlineLeft } from "react-icons/ai";
import { BsFillLightningFill } from "react-icons/bs";

import { cn } from "@/utils/style-utils";

import MobileNavbar from "./mobile-navbar";
import { Box } from "./ui/box";

interface IHowToPlayProps {
  onHideHowToPlay?: () => void;
  hideText?: string;
}

const HowToPlay = ({ onHideHowToPlay, hideText }: IHowToPlayProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 overflow-hidden lg:max-h-full lg:items-center lg:justify-center",
        onHideHowToPlay && hideText && "mt-8 lg:mt-4",
      )}
    >
      {onHideHowToPlay && hideText && (
        <MobileNavbar goBackAction={onHideHowToPlay} goBackText={hideText} href="" />
      )}
      {onHideHowToPlay && hideText && (
        <div
          className="hidden cursor-pointer items-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex lg:shrink-0"
          onClick={onHideHowToPlay}
        >
          <AiOutlineLeft className="inline-block" /> {hideText}
        </div>
      )}
      <div className="flex min-h-0 w-fit flex-1 px-5 lg:px-0">
        <Box
          title="HOW TO PLAY"
          className="mb-4 flex h-full flex-col items-start justify-center gap-5 overflow-y-auto p-5 tracking-wider lg:flex-row lg:gap-12 lg:px-12 lg:py-8"
          wrapperClassName="h-full min-h-0"
        >
          <div className="flex flex-col gap-5 lg:w-[830px]">
            <p className="w-fit border-b-2 border-b-primary text-lg font-semibold uppercase tracking-widest lg:text-2xl">
              About v3rpg
            </p>
            <div className="text-sm leading-[160%] tracking-normal">
              📜 <span className="font-semibold">V3RPG</span> is an exciting interactive
              storytelling game that lets you step into the shoes of a character within the story.{" "}
              <span className="font-semibold">You&apos;ll journey through up to 8 turns</span>
              , and each turn unfolds the story based on your choices as the player.
              <br />
              <br />
              🛡️ In the game, you&apos;ll encounter{" "}
              <span className="font-semibold">2 types of actions</span>: <br />
              <ol className="ml-2 list-inside list-decimal">
                <li>
                  <span className="font-semibold">Default actions</span> can impact your
                  character&apos;s stats, such as health, mana, and round bonuses, although they
                  might not significantly alter the story.{" "}
                </li>
                <li>
                  <span className="font-semibold">Free will actions</span>, on the other hand,
                  won&apos;t modify your stats (unless, unfortunately, you meet a tragic fate or get
                  injured), but they provide you with the power to influence the story&apos;s
                  direction and express your character.{" "}
                </li>
              </ol>
              <br />
              🎲{" "}
              <span className="font-semibold">
                Both free will and default actions can lead to either positive or negative outcomes
              </span>
              , depending on the results of dice rolls and the modifiers specific to each round.{" "}
              <span className="font-semibold">
                Aiming for higher dice numbers increases your chances of success
              </span>
              . <br />
              <br />
              ✍🏻{" "}
              <span className="font-semibold">
                Let&apos;s take a look at the dice roll modifiers
              </span>
              :
              <ol className="ml-2 list-inside list-decimal">
                <li>
                  {" "}
                  <span className="font-semibold">Bob&apos;s Combined Rating</span>: Our Dungeon
                  Master (DM), Bob, assesses your actions. If they align with safety, ease, and your
                  character&apos;s traits, you&apos;ll receive better ratings and bonus points.
                  However, if you&apos;re taking risks or acting out of character, you might receive
                  lower ratings and lose points.
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Mana</span>: You can acquire mana by successfully
                  executing your character&apos;s default mana action. As the game progresses, you
                  can utilize this mana to enhance your dice rolls. Remember to declare your intent
                  to use mana before you roll the dice.
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Round Bonus</span>: If you perform the round bonus
                  action correctly, you&apos;ll gain a bonus for your next turn. This bonus benefits
                  all players but only lasts for one round{" "}
                </li>
              </ol>
              <br />
              ❤️‍🩹 It&apos;s essential to keep an eye on your character&apos;s health. If your actions
              result in harm, it could lead to dire consequences. <br />
              🔮 Additionally, you have the opportunity to ask Bob a direct question in each round
              to obtain additional information and influence the storyline as you wish. Bob will
              answer one question per round, providing relevant and truthful information. <br />
              <br />
              ⚔️{" "}
              <span className="font-semibold">
                The game concludes when you successfully complete the adventure or, unfortunately,
                meet your character&apos;s demise
              </span>
              . The last player standing is declared the winner, while all others who perish or fail
              during the process are considered defeated. <br />
              <br />
              🤞🏻{" "}
              <span className="font-semibold">Good luck and enjoy your adventure in V3RPG! </span>
            </div>
          </div>

          <div className="hidden h-full border-l border-l-white/20 lg:block" />
          <div className="block w-full border-t border-t-white/20 lg:hidden" />

          <div className="flex flex-col lg:w-[850px]">
            <p className="w-fit border-b-2 border-b-primary text-lg font-semibold uppercase tracking-widest lg:text-2xl">
              Dice roll distribution key
            </p>
            <p className="mt-4 font-semibold tracking-[2.7px] lg:text-lg">DEFAULT TURNS</p>
            <p className="mt-4 lg:mt-2">
              Depending of what action you choose, the total dice value will have a different effect
              on your characters stats.
            </p>
            <div className="mt-2 w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2", "3-4", "5-6", "7-8-9", "10-11", "12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/10">
                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left text-sm">
                      Heal action
                    </td>
                    {["-3", "-1", "nothing", "+1", "+2", "+3"].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2 text-sm">
                          <p>{value}</p>
                          {value !== "nothing" && <AiFillHeart />}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-2 w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2", "3-4", "5-6", "7-8", "9-10-11", "12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/10">
                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left text-sm">
                      Mana action
                    </td>
                    {[
                      { value: "-3", Icon: <AiFillHeart /> },
                      { value: "-1", Icon: <AiFillHeart /> },
                      { value: "both" },
                      { value: "+1", Icon: <BsFillLightningFill /> },
                      { value: "+2", Icon: <BsFillLightningFill /> },
                      { value: "+3", Icon: <BsFillLightningFill /> },
                    ].map((item, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        {item.value === "both" ? (
                          <div className="flex flex-row items-center justify-center gap-4 text-sm">
                            <div className="flex flex-row items-center justify-center gap-2 text-sm">
                              <p>-1</p>
                              <AiFillHeart />
                            </div>
                            <div className="flex flex-row items-center justify-center gap-2 text-sm">
                              <p>+1</p>
                              <BsFillLightningFill />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center justify-center gap-2 text-sm">
                            <p>{item.value}</p>
                            {item.Icon}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-2 w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2", "3-4", "5-6", "7", "8-9", "10-11", "12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/10">
                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left text-sm">
                      Round bonus action
                    </td>
                    {["-3", "-2", "-1", "nothing", "+1", "+2", "+3"].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2 text-sm">
                          <p>{value}</p>
                          {value !== "nothing" && value.includes("-") && <AiFillHeart />}
                          {value !== "nothing" && value.includes("+") && <BsFillLightningFill />}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-2 w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2-6", "7-12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/10">
                  <tr className="text-center">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left text-sm">
                      Round bonus action
                    </td>
                    {["-1", "No effect on your stats"].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2 text-sm">
                          <p>{value}</p>
                          {value.includes("-") && <AiFillHeart />}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <tr className="text-center">
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
            </div>*/}

            <p className="mt-8 font-semibold tracking-[2.7px] lg:text-lg">FREE WILL TURNS</p>
            <p className="mt-2">
              Outcomes of your actions depend on the total die value after the modifiers. Higher the
              number, more successfull you are. These are the projected outcomes:
            </p>

            <div className="w-[310px] overflow-x-auto pb-2 sm:w-full lg:pb-0">
              <table className="mt-4 w-full whitespace-nowrap font-normal lg:mt-2">
                <thead>
                  <tr className="bg-white/25 text-center">
                    <th className="border-b border-b-white/25 px-3 py-2 text-left">Dice total</th>
                    {["2", "3-4", "5-6", "7", "8-9", "10-11", "12"].map((value, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25 px-3 py-2"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/10">
                  <tr className="text-center text-sm">
                    <td className="border-b border-b-white/25 px-3 py-2 text-left">
                      Typing your move
                    </td>
                    {[
                      "abysmal",
                      "terrible",
                      "bad",
                      "mediocre",
                      "good",
                      "excellent",
                      "miraculous",
                    ].map((value, index) => (
                      <td
                        key={index}
                        className="border-b border-l border-b-white/25 border-l-white/25"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <p>{value}</p>
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
