import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
const Rectangle3 = (props:ISvgProps) => (
  <Svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_6_192)">
      <Rect
        x='-0.1%'
        y='1.5%'
        width='95%' 
        height='95%'
        rx={20}
        transform="rotate(-1.7 4 8.90015)"
        fill={props.color}
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default Rectangle3;