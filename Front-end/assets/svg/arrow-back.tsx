import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowBack = (props:ISvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
      fill="#0054C1"
    />
  </Svg>
);
export default ArrowBack;
