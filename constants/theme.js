const COLORS = {
  primary: "#DA2F47",
  secondary: "#444262",
  tertiary: "#FF7754",

  line: "#FF3642",

  gray: "#83829A",
  gray2: "#C1C0C8",
  gray3: "#a5a4ab",

  red: "#FF000F",
  redTop: "#FF3642",
  redWhite: "#FF364E",

  white: "#FFFFFF",
  lightWhite: "#FAFAFC",

  enabled: "#bf2831",
  disabled: "#8a8a8a",

  warning: "#cc3300",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
  // raleway: "Raleway_Semibold",
  Grotesk: "Grotesk",
  Grotesk_regular: "Grotesk_regular",
  BakbakOne: "BakbakOne",
};

const SIZES = {
  xxxSmall: 6,
  xxSmall: 8,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 40,
};

const SPACES = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SPACES, SHADOWS };
