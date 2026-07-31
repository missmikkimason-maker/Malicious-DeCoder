# Device Detox

Device Detox helps you inspect text from an unwanted installation or suspicious log by highlighting patterns such as hex strings, Base64 blobs, IP addresses, URLs, and email addresses.

> **Note about GitHub Marketplace**
> GitHub Marketplace is for GitHub Apps and GitHub Actions that integrate with GitHub repositories. Because this project is a mobile app, it cannot be listed on GitHub Marketplace. The apps are intended for the Apple App Store and Google Play Store.

## Public mobile apps

This repo includes two Expo apps:

- `apps/ios-app` (iOS)
- `apps/android-app` (Android)

### Build locally

```bash
cd apps/ios-app
npm install
npm run start
```

```bash
cd apps/android-app
npm install
npm run start
```

### Publish publicly (App Store + Play Store)

1. Install Expo Application Services CLI: `npm i -g eas-cli`
2. Log in: `eas login`
3. Create an EAS project for each app and set the `extra.eas.projectId` values in `apps/ios-app/app.json` and `apps/android-app/app.json`.
4. Build production apps:
   - iOS: `cd apps/ios-app && eas build --platform ios --profile production`
   - Android: `cd apps/android-app && eas build --platform android --profile production`
5. Submit for public release:
   - iOS: `cd apps/ios-app && eas submit --platform ios --profile production`
   - Android: `cd apps/android-app && eas submit --platform android --profile production`

### Required before store submission

- Apple Developer Program membership (iOS).
- Google Play Developer account (Android).
- Public privacy policy and support URLs.
- Store screenshots for each supported device size and localization.
- App icon and splash assets must meet platform requirements:
  - iOS: App Store icon at 1024×1024 px; Xcode will generate other sizes from the source.
  - Android: Adaptive icon foreground at 1024×1024 px, background color/image, and optional monochrome layer.

### Automated releases

Pushing a tag matching `v*` triggers `.github/workflows/release-apps.yml`, which builds production apps via EAS and creates a GitHub Release. Set the repository secret `EXPO_TOKEN` for this workflow to authenticate with Expo.
