const COLORS = {
  primary: "#DA2F47",
  accent: "#84848B",

  text: "#21252F",
  textLight: "#84848B",

  background: "#ffffff",
  modal: "",

  grayLight: "#E2E8F0",
  grayMid: "#83829A",
  grayDark: "#84848B",

  success: "#63ad0e",
  error: "#b3002a",
  enabled: "#DA2F47",
  disabled: "#4d4d4d",

  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate700: "#334155",
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
  xSmall: 12,
  small: 14,
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
