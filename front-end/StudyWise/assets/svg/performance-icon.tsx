import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const PerformanceIcon = (props:ISvgProps) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={30} height={30} fill="url(#pattern0_1080_105)" />
    <Defs>
      <Pattern
        id="pattern0_1080_105"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_1080_105" transform="scale(0.00390625)" />
      </Pattern>
      <Image
        id="image0_1080_105"
        width={256}
        height={256}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default PerformanceIcon;