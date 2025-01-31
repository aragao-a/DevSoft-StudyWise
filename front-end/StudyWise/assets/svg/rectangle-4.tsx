import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
const Rectangle4 = (props:ISvgProps) => (
  <Svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_6_117)">
      <Rect width="90%" height="95%" rx={20} x='5%' fill={props.color}/>
    </G>
    <Defs></Defs>
  </Svg>
);
export default Rectangle4;
