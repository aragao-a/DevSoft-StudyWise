import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
const Rectangle2 = (props:ISvgProps) => (
  <Svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_6_198)">
      <Rect
        x='13%'
        rx={20}
        width="85%" 
        height="95%"
        transform="rotate(1 15.0125 0)"
        fill={props.color}
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default Rectangle2;
