const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

const buildTypeCheckCommand = (filenames) => `tsc --noEmit -p tsconfig.json`;

module.exports = {
  // "*.{ts,tsx}": [buildTypeCheckCommand],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
};
