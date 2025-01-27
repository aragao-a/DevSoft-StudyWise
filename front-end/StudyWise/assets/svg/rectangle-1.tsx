import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
const Rectangle1 = (props:ISvgProps) => (
  <Svg
    width={359}
    height={645}
    viewBox="0 0 359 645"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_6_196)">
      <Rect
        x={4}
        y={5.93384}
        width={340}
        height={631}
        rx={20}
        transform="rotate(-1 4 5.93384)"
        fill={props.color}
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default Rectangle1;
