import { Lexend } from "next/font/google";
import localFont from "next/font/local";

export const lexend = Lexend({ subsets: ["latin"] });

export const jibril = localFont({
  src: "../../public/fonts/JibrilRegular.woff",
});
