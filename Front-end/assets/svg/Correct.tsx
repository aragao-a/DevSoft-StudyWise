import * as React from "react";
import Svg, { G, Rect, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { ISvgProps } from "@/constants/svg.types";
const SVGComponent = (props:ISvgProps) => (
  <Svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_29_108)">
      <Rect
        x={4}
        width={42}
        height={42}
        rx={21}
        fill="#73BF43"
      />
      <Path
        d="M31.6666 16L22.4999 25.1667L18.3333 21"
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
