import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const FrownIcon = (props:ISvgProps) => (
  <Svg
    width={81}
    height={80}
    viewBox="0 0 81 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_3_1718)">
      <Path
        d="M53.8333 53.3333C53.8333 53.3333 48.8333 46.6667 40.5 46.6667C32.1666 46.6667 27.1666 53.3333 27.1666 53.3333M30.5 30H30.5333M50.5 30H50.5333M73.8333 40C73.8333 58.4095 58.9095 73.3333 40.5 73.3333C22.0905 73.3333 7.16663 58.4095 7.16663 40C7.16663 21.5905 22.0905 6.66666 40.5 6.66666C58.9095 6.66666 73.8333 21.5905 73.8333 40Z"
        stroke="#D9D9D9"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3_1718">
        <Rect width={80} height={80} fill="white" transform="translate(0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FrownIcon;
