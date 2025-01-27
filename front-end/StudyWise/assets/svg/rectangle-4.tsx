import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
const Rectangle4 = (props:ISvgProps) => (
  <Svg
    width={348}
    height={639}
    viewBox="0 0 348 639"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_6_117)">
      <Rect width={340} height={631} rx={20} fill={props.color}/>
    </G>
    <Defs></Defs>
  </Svg>
);
export default Rectangle4;
