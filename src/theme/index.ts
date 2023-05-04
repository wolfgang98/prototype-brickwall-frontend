import { theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";
import { colors } from "@project/util/colors";

export const AppTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.MintGreen,
  },
  components: {
    Button: {
      colorLink: colors.PowderBlue,
      colorLinkHover: colors.MintGreen,
    }
  }
}

export const { useToken } = theme;