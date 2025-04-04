import { ISvgProps } from "@/constants/svg.types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
const EditIcon = (props:ISvgProps) => (
  <Svg
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10 17.1667H17.5M13.75 3.41669C14.0815 3.08517 14.5312 2.89893 15 2.89893C15.2321 2.89893 15.462 2.94465 15.6765 3.03349C15.891 3.12233 16.0858 3.25254 16.25 3.41669C16.4142 3.58084 16.5444 3.77572 16.6332 3.9902C16.722 4.20467 16.7678 4.43455 16.7678 4.66669C16.7678 4.89884 16.722 5.12871 16.6332 5.34319C16.5444 5.55766 16.4142 5.75254 16.25 5.91669L5.83333 16.3334L2.5 17.1667L3.33333 13.8334L13.75 3.41669Z"
      stroke="#3C3C3C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditIcon;
