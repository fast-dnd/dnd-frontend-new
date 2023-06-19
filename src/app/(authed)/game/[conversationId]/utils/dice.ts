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

export const randomDice = (total?: number) => {
  if (!total) {
    //generating something random
    const min = 1;
    const max = 9;
    const first = Math.floor(Math.random() * (max - min + 1)) + min;
    const second = Math.floor(Math.random() * (max - min + 1)) + min;
    return [first, second];
  } else {
    const min = 1;
    const max = total - min;
    const first = Math.floor(Math.random() * (max - min + 1)) + min;
    const second = total - first;
    return [first, second];
  }
};
