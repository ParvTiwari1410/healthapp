// @ts-nocheck
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ZegoUIKitPrebuiltCallService } from "@zegocloud/zego-uikit-prebuilt-call-rn";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // KEEP YOUR ORIGINAL ZEGO INITIALIZATION
  useEffect(() => {
    const initZego = async () => {
      try {
        const userID = "user_" + Date.now(); // Unique for each session

        const tokenResponse = await fetch(
          `http://10.248.163.125:3000/token?userID=${userID}&roomID=defaultRoom`
        );

        const { token } = await tokenResponse.json();

        ZegoUIKitPrebuiltCallService.init(
          {
            appID: 880962249,
            token: token,
          },
          {
            userID,
            userName: "Parv",
          }
        );

        console.log("✅ Zego Initialized Successfully");
      } catch (err) {
        console.error("❌ Zego Init Error:", err);
      }
    };

    initZego();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>

        {/* YOUR TABS */}
        <Stack.Screen name="(tabs)" />

        {/* ALL YOUR SCREENS UNDER /app */}
        <Stack.Screen name="calling-screen" />
        <Stack.Screen name="video-call" />
        <Stack.Screen name="no-answer" />
        <Stack.Screen name="call-ended" />
        <Stack.Screen name="call-disconnected" />

        <Stack.Screen name="appointment-details" />
        <Stack.Screen name="my-bookings" />
        <Stack.Screen name="doctors" />
        <Stack.Screen name="your-concern" />
        <Stack.Screen name="choose-consultation" />
        <Stack.Screen name="choose-date" />
        <Stack.Screen name="choose-timeslot" />
        <Stack.Screen name="basic-info" />
        <Stack.Screen name="appointment-confirm" />
        <Stack.Screen name="payment-success" />

        {/* KEEP YOUR MODAL */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />

      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
