import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
const Rectangle3 = (props:ISvgProps) => (
  <Svg
    width={364}
    height={648}
    viewBox="0 0 364 648"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_6_192)">
      <Rect
        x={4}
        y={8.90015}
        width={340}
        height={631}
        rx={20}
        transform="rotate(-1.7 4 8.90015)"
        fill={props.color}
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default Rectangle3;
