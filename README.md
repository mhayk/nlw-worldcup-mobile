# NLW World Cup Mobile

### Typescript
```bash
$ npx expo start
```

## Expo

## Expo AuthSession
Link: (Expo Authentication)[https://docs.expo.dev/guides/authentication/]
```bash
$ npx expo install expo-auth-session expo-random
$
```

## Expo WebBrowser
```bash
$ npx expo install expo-web-browser
```

## Emulator

### iOS
```bash
$ xcrun simctl list
$ open -a Simulator --args -CurrentDeviceUDID 93A9B3B2-1459-47A8-81A8-4783A861BF28
```

## NativeBase
```bash
$ npm install native-base
$ npx expo install react-native-svg@12.1.1
$ npx expo install react-native-safe-area-context@3.3.2
```

## Google Fonts
```bash
$ npx expo install expo-font @expo-google-fonts/roboto
```

## React Native SVG Transformer
Link: (react-native-svg-transformer)[https://github.com/kristerkari/react-native-svg-transformer]
```bash
$ npm i react-native-svg-transformer
```
File: metro.config.js
```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
```

## Google OAuth2
- (Google Console)[https://console.cloud.google.com]
- URIs (Authorize JavaScript origins): https://auth.expo.io
- Authorized redirect URIs: https://auth.expo.io/@your-username/your-project-slug

* It is important to remind to authenticate with expo login.
```bash
$ expo login
$ expo whoami
```
* Code to get the authorized redirect URIs:
```js
import * as AuthSession from 'expo-auth-session'
...
console.log(AuthSession.makeRedirectUri({ useProxy: true })) // https://auth.expo.io/@mhayk/nlwworldcupmobile
```