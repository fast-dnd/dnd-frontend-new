export const dieMap: boolean[][][] = [
  [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ],
  [
    [false, false, false],
    [false, true, false],
    [false, false, false],
  ],
  [
    [true, false, false],
    [false, false, false],
    [false, false, true],
  ],
  [
    [true, false, false],
    [false, true, false],
    [false, false, true],
  ],
  [
    [true, false, true],
    [false, false, false],
    [true, false, true],
  ],
  [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ],
  [
    [true, false, true],
    [true, false, true],
    [true, false, true],
  ],
  [
    [true, false, true],
    [true, true, true],
    [true, false, true],
  ],
  [
    [true, true, true],
    [true, false, true],
    [true, true, true],
  ],
  [
    [true, true, true],
    [true, true, true],
    [true, true, true],
  ],
];

export const randomDice = (total?: number, limit?: number) => {
  const maxValue = limit ?? 6;
  if (!total) {
    //generating something random
    const min = 1;
    const max = maxValue;
    const first = Math.floor(Math.random() * (max - min + 1)) + min;
    const second = Math.floor(Math.random() * (max - min + 1)) + min;
    return [first, second];
  } else {
    const newTotal = Math.min(total, 12);
    const min = Math.max(1, newTotal - maxValue);
    const max = Math.min(newTotal - min, maxValue);
    const first = Math.floor(Math.random() * (max - min + 1)) + min;
    const second = newTotal - first;
    return [first, second];
  }
};
