import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Plus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
    width={20}
    height={20}
    aria-hidden="true"
  >
    <Path
      fill={props.fill || "#231f20"}
      d="M468.3 212.7H305.2v-169c0-24.2-19.6-43.8-43.8-43.8-24.2 0-43.8 19.6-43.8 43.8v169h-174c-24 0-43.6 19.6-43.6 43.8 0 24.2 19.6 43.8 43.8 43.8h174v168c0 24.2 19.6 43.8 43.8 43.8 24.2 0 43.8-19.6 43.8-43.8v-168h163.1c24.2 0 43.8-19.6 43.8-43.8-.3-24.2-19.8-43.8-44-43.8z"
    />
  </Svg>
);

export default Plus;
