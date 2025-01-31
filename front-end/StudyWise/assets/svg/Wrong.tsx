import * as React from "react";
import Svg, { G, Rect, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { ISvgProps } from "@/constants/svg.types";
const SVGComponent = (props:ISvgProps) => (
  <Svg
    width={49}
    height={49}
    viewBox="0 0 49 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_29_150)">
      <Rect
        x={4}
        width={41}
        height={41}
        rx={20.5}
        fill="#EF3E36"
      />
      <Path
        d="M30.75 14.25L18.25 26.75M18.25 14.25L30.75 26.75"
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SVGComponent;
