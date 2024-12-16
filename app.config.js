import "dotenv/config";

export default {
  expo: {
    name: "ChronoLock",
    slug: "chronolock",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/chronolock-logo2.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/chronolock-logo2a.png",
        backgroundColor: "#ffffff",
      },
      package: "com.markvincentcleofe06.chronolock",
      googleServicesFile: "./google-services.json",
      permissions: [
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "BLUETOOTH_CONNECT",
        "BLUETOOTH_SCAN",
        "ACCESS_FINE_LOCATION",
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSENGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: "a601ec96-9028-42ff-a265-9cfec7ca0f2b",
      },
    },
    owner: "markvincentcleofe06",
    runtimeVersion: "1.0.0", // Set explicit runtime version here
    updates: {
      url: "https://u.expo.dev/a601ec96-9028-42ff-a265-9cfec7ca0f2b",
    },
  },
};
