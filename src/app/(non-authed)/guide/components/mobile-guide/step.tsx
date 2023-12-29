import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/utils/style-utils";

const steps = [
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-1.png"
          alt={"basics"}
          width={242}
          height={249}
          className="mr-7"
        />
      </div>
    ),
    title: "the basics",
    description: (
      <p className="text-sm font-light leading-tight">
        You&apos;ll journey through up to 8 turns, and each turn unfolds the story based on your
        choices as the player. Players are allowed one action per turn.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-2.png"
          alt={"basics"}
          width={303}
          height={218}
          className=""
        />
      </div>
    ),
    title: "actions",
    description: (
      <p className="text-sm font-light leading-tight">
        In the game, you&apos;ll encounter two types of actions: <br />
        <br />
        <span className="font-bold">Default actions </span>can impact your character&apos;s stats,
        such as health, mana, and round bonuses, though they might not significantly alter the
        story.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-3.png"
          alt={"basics"}
          width={262}
          height={249}
          className=""
        />
      </div>
    ),
    title: "actions",
    description: (
      <p className="text-sm font-light leading-tight">
        Free will actions, on the other hand, won&apos;t modify your stats (unless, unfortunately,
        you meet a tragic fate or get injured), but they provide you with the power to influence the
        story&apos;s direction and express your character.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-4.png"
          alt={"basics"}
          width={214}
          height={249}
          className=""
        />
      </div>
    ),
    title: "outcomes",
    description: (
      <p className="text-sm font-light leading-tight">
        Both free will and default actions can lead to either positive or negative outcomes. If you
        succeed in action you will get the positive effect in various degrees depending on how high
        you rolled (including the dice roll modifiers).
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-5.png"
          alt={"basics"}
          width={360}
          height={284}
          className="-mt-3"
        />
      </div>
    ),
    title: "outcomes",
    description: (
      <p className="text-sm font-light leading-tight">
        But, if your roll is a low number (including dice roll modifiers), our Dungeon Master Bob
        can decide that your roll failed and it will result in negative effects for you and your
        teammates.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-6.png"
          alt={"basics"}
          width={273}
          height={249}
          className="ml-[59px]"
        />
      </div>
    ),
    title: "dice roll modifiers",
    description: (
      <p className="text-sm font-light leading-tight">
        <span className="font-bold">Our Dungeon Master (DM), Bob</span>, assesses your actions. If
        they align with safety, ease, and your character&apos;s traits, you&apos;ll receive better
        ratings and bonus points. However, if you&apos;re taking risks or acting out of character,
        you might receive lower ratings and lose points.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-7.png"
          alt={"basics"}
          width={289}
          height={220}
          className=""
        />
      </div>
    ),
    title: "dice roll modifiers",
    description: (
      <p className="text-sm font-light leading-tight">
        <span className="font-bold">Mana action:</span> gives you mana on success. You can utilize
        this mana to add to your dice rolls at free will turns. Remember to declare your intent to
        use mana before you roll the dice.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-8.png"
          alt={"basics"}
          width={291}
          height={249}
          className=""
        />
      </div>
    ),
    title: "dice roll modifiers",
    description: (
      <p className="text-sm font-light leading-tight">
        <span className="font-bold">Round Bonus action:</span> It&apos;s essential to keep an eye on
        your character&apos;s health. If your actions result in harm, it could lead to dire
        consequences.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-9.png"
          alt={"basics"}
          width={242}
          height={214}
          className="ml-1"
        />
      </div>
    ),
    title: "ask bob",
    description: (
      <p className="text-sm font-light leading-tight">
        You have the opportunity to ask Bob a direct question in each round to obtain additional
        information and influence the storyline as you wish. Bob will answer one question per round,
        providing relevant and truthful information.
      </p>
    ),
  },
  {
    image: (
      <div className="absolute left-0 top-0 -z-10 flex w-full justify-center">
        <Image
          src="/images/how-to-play/mobile/step-10.png"
          alt={"basics"}
          width={346}
          height={294}
          className=""
        />
      </div>
    ),
    title: "the end",
    description: (
      <p className="text-sm font-light leading-tight">
        The game concludes when you successfully complete the adventure or, unfortunately, meet your
        character&apos;s demise.
      </p>
    ),
  },
];

const Step = ({ stepIndex }: { stepIndex: number }) => {
  return (
    <motion.li
      layout
      className="relative flex h-full w-screen shrink-0 select-none flex-col justify-end"
    >
      <div className="relative flex h-[400px] w-full flex-col justify-end">
        {steps[stepIndex].image}
        <div
          className={cn(
            "absolute bottom-0 h-[200px] w-full bg-gradient-to-b from-transparent to-black to-20%",
            stepIndex === 0 && "right-0 w-[300%]",
            stepIndex === 9 && "left-0 w-[300%]",
          )}
        />
        <div className="z-10 flex h-[150px] w-full flex-col justify-center gap-3 px-8">
          <p className="text-xl font-semibold uppercase leading-none">{steps[stepIndex].title}</p>
          {steps[stepIndex].description}
        </div>
      </div>
    </motion.li>
  );
};

export default Step;
