# Malicious-DeCoder
Sick of Being Stalked, Mocked &amp; Utterly Annoyed By Some Virus God Knows Where. Hopefully This Will Help Elevate The Constant Desire To Smash All Your Devices

## Public mobile apps

This repo now includes two Expo apps:

- `/home/runner/work/Malicious-DeCoder/Malicious-DeCoder/apps/ios-app` (iOS)
- `/home/runner/work/Malicious-DeCoder/Malicious-DeCoder/apps/android-app` (Android)

### Build locally

```bash
cd /home/runner/work/Malicious-DeCoder/Malicious-DeCoder/apps/ios-app
npm install
npm run start
```

```bash
cd /home/runner/work/Malicious-DeCoder/Malicious-DeCoder/apps/android-app
npm install
npm run start
```

### Publish publicly (App Store + Play Store)

1. Install Expo Application Services CLI: `npm i -g eas-cli`
2. Log in: `eas login`
3. Build production apps:
   - iOS: `cd /home/runner/work/Malicious-DeCoder/Malicious-DeCoder/apps/ios-app && eas build --platform ios --profile production`
   - Android: `cd /home/runner/work/Malicious-DeCoder/Malicious-DeCoder/apps/android-app && eas build --platform android --profile production`
4. Submit for public release:
   - iOS: `eas submit --platform ios --profile production`
   - Android: `eas submit --platform android --profile production`
