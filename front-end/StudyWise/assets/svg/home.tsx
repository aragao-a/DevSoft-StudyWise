import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ISvgProps } from "@/constants/svg.types";
const HomeIcon = (props:ISvgProps) => (
  <Svg
    width={28}
    height={30}
    viewBox="0 0 28 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.25 27.5V15H17.75V27.5M2.75 11.25L14 2.5L25.25 11.25V25C25.25 25.663 24.9866 26.2989 24.5178 26.7678C24.0489 27.2366 23.413 27.5 22.75 27.5H5.25C4.58696 27.5 3.95107 27.2366 3.48223 26.7678C3.01339 26.2989 2.75 25.663 2.75 25V11.25Z"
      stroke="#0054C1"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HomeIcon;
