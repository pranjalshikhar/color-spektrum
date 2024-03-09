import { vanillaGradients } from "@/data/directions";
import colors from "tailwindcss/colors";

export const generateVanillaGradients = (gradient, from, via, to) => {
  const resultantGradient = vanillaGradients[gradient].gradient;
  const resultantDirection = vanillaGradients[gradient].direction;

  const fromSelectedColor = from?.split("-")[1];
  const fromRange = parseInt(from?.split("-")[2]);
  const resultantFrom = colors[fromSelectedColor][fromRange];

  const viaSelectedColor = via?.split("-")[1];
  const viaRange = parseInt(via?.split("-")[2]);
  const resultantVia = colors[viaSelectedColor][viaRange];

  const toSelectedColor = to?.split("-")[1];
  const toRange = parseInt(to?.split("-")[2]);
  const resultantTo = colors[toSelectedColor][toRange];

  const result = `${resultantGradient}(${
    resultantDirection ? resultantDirection + ", " : ""
  }${resultantFrom}, ${resultantVia}, ${resultantTo})`;

  return result;
};
