export const steps = [
  {
    title: "the basics",
    description:
      "You'll journey through up to 8 turns, and each turn unfolds the story based on your choices as the player. Players are allowed one action per turn.",
  },
  {
    title: "actions",
    description: (
      <div>
        In the game, you&apos;ll encounter challenges while executing actions:
        <ul className="mt-4 list-disc pl-6">
          <li>
            <b className="font-bold">Normal action</b> No limitations on your move, you can say
            whatever you want but it needs to match your character.
          </li>
          <li>
            <b className="font-bold">Emotionaly driven action</b> Bob will give boost to move that
            is played in desired emotion that he requires.
          </li>
          <li>
            <b className="font-bold">Random words action</b> Bob will set 2 anchor words which you
            need to add in your action.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "outcomes",
    description: (
      <>
        <p>
          Actions can lead to either positive or negative outcomes. If you succeed in action you
          will get the positive effect in various degrees depending on how high you rolled
          (including the dice roll modifiers).
        </p>
        <p className="mt-6">
          But, if your roll is a low number (including dice roll modifiers), our Dungeon Master Bob
          can decide that your roll failed and it will result in negative effects for you and your
          teammates.
        </p>
      </>
    ),
  },
  {
    title: "dice roll modifiers",
    description: (
      <>
        <p>
          <span className="font-bold">Bob&apos;s Combined Rating:</span> Our Dungeon Master (DM),
          Bob, assesses your actions. If they align with safety, ease, and your character&apos;s
          traits, you&apos;ll receive better ratings and bonus points. However, if you&apos;re
          taking risks or acting out of character, you might receive lower ratings and lose points.
        </p>
        <p className="mt-6">
          <span className="font-bold">Mana:</span> Mana action gives you mana on success. You can
          utilize this mana to add to your dice rolls at free will turns. Remember to declare your
          intent to use mana before you roll the dice.
        </p>
        <p className="mt-6">
          <span className="font-bold">Round Bonus action:</span> It&apos;s essential to keep an eye
          on your character&apos;s health. If your actions result in harm, it could lead to dire
          consequences.
        </p>
      </>
    ),
  },
  {
    title: "ask bob",
    description:
      "You have the opportunity to ask Bob a direct question in each round to obtain additional information and influence the storyline as you wish. Bob will answer one question per round, providing relevant and truthful information.",
  },
  {
    title: "the end",
    description:
      "The game concludes when you successfully complete the adventure or, unfortunately, meet your character's demise.",
  },
];
