import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Minus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
    width={30}
    height={30}
    aria-hidden="true"
  >
    <Path
      fill={props.fill || "#000"}
      d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"
    />
  </Svg>
);

export default Minus;
