import { Jost } from "next/font/google";
import localFont from "next/font/local";

export const jost = Jost({ subsets: ["latin"] });

export const jibril = localFont({
  src: "../../public/fonts/JibrilRegular.woff",
});
