import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg";
import { ISvgProps } from "@/constants/svg.types";
const StudyWiseLogo2 = (props:ISvgProps) => (
  <Svg
    width={210}
    height={40}
    viewBox="0 0 210 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={209.412} height={40} fill="url(#pattern0_87_19)" />
    <Defs>
      <Pattern
        id="pattern0_87_19"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#image0_87_19"
          transform="matrix(0.00103413 0 0 0.00541395 0 -0.00891172)"
        />
      </Pattern>
      <Image
        id="image0_87_19"
        width={967}
        height={188}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default StudyWiseLogo2
