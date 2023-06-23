module.exports = {
  "./src/**/*.(ts|tsx)": () => "pnpm run type-check",

  "./src/**/*.(ts|tsx|js)": (filenames) => [
    `pnpm run lint:fix ${filenames.join(" ")}`,
    `pnpm run format:fix ${filenames.join(" ")}`,
  ],

  "./src/**/*.(md|json)": (filenames) => `pnpm run format:fix ${filenames.join(" ")}`,
};
