import { vanillaGradients } from "@/data/directions";
import colors from "tailwindcss/colors";

export const generateVanillaGradients = (gradient, from, via, to) => {
  const resultantGradient = vanillaGradients[gradient].gradient;
  const resultantDirection = vanillaGradients[gradient].direction;

  const fromSelectedColor = from ? from.split("-")[1] : null;
  const fromRange = from ? parseInt(from.split("-")[2]) : null;
  const resultantFrom =
    fromSelectedColor && fromRange
      ? colors[fromSelectedColor][fromRange]
      : null;

  const viaSelectedColor = via ? via.split("-")[1] : null;
  const viaRange = via ? parseInt(via.split("-")[2]) : null;
  const resultantVia =
    viaSelectedColor && viaRange ? colors[viaSelectedColor][viaRange] : null;

  const toSelectedColor = to ? to.split("-")[1] : null;
  const toRange = to ? parseInt(to.split("-")[2]) : null;
  const resultantTo =
    toSelectedColor && toRange ? colors[toSelectedColor][toRange] : null;

  const result = resultantCode(
    resultantGradient,
    resultantDirection,
    resultantFrom,
    resultantVia,
    resultantTo
  );

  return result;
};

function resultantCode(gradient, direction, from, via, to) {
  let gradientString = gradient + "(" + direction;

  if (from) {
    gradientString += `, ${from}`;
  }

  if (via) {
    gradientString += `, ${via}`;
  }

  if (to) {
    gradientString += `, ${to}`;
  }

  gradientString += ")";

  return gradientString;
}
