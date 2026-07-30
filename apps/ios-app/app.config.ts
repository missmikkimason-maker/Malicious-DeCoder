import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: process.env.EXPO_APP_NAME_IOS ?? "Imagination Imagery iOS",
  slug: process.env.EXPO_APP_SLUG_IOS ?? "imagination-imagery-ios",
  version: process.env.EXPO_APP_VERSION ?? "1.0.0",
  platforms: ["ios"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  ios: {
    bundleIdentifier:
      process.env.EXPO_IOS_BUNDLE_IDENTIFIER ??
      "space.manus.imaginationimagery.ios",
    supportsTablet: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};

export default config;
