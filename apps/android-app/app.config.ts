import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: process.env.EXPO_APP_NAME_ANDROID ?? "Imagination Imagery Android",
  slug: process.env.EXPO_APP_SLUG_ANDROID ?? "imagination-imagery-android",
  version: process.env.EXPO_APP_VERSION ?? "1.0.0",
  platforms: ["android"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  android: {
    package:
      process.env.EXPO_ANDROID_PACKAGE ??
      "space.manus.imaginationimagery.android",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};

export default config;
