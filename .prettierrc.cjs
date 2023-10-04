/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  endOfLine: "auto",

  plugins: [require("@ianvs/prettier-plugin-sort-imports"), require("prettier-plugin-tailwindcss")],

  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components(/(.*))?$",
    "^@/components/ui/(.*)$",
    "^@/config(/(.*))?$",
    "^@/hooks(/(.*))?$",
    "^@/lib(/(.*))?$",
    "^@/services(/(.*))?$",
    "^@/stores(/(.*))?$",
    "^@/styles(/(.*))?$",
    "^@/types(/(.*))?$",
    "^@/utils(/(.*))?$",
    "^@/validations(/(.*))?$",
    "",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],

  tailwindFunctions: ["cn", "cva"],
};
