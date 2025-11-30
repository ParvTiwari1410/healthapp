// video-call.tsx
// @ts-nocheck
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function VideoCallScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const appID = params.appID;
  const token = params.token;
  const userID = params.userID;
  const roomID = params.roomID;
  const doctorName = params.doctorName ?? "Doctor";

  const webRef = useRef(null);

  // Build HTML payload for the WebView.
  // NOTE: the snippet below uses a common CDN import for Zego Web SDK.
  // If Zego provides a different CDN URL, replace the <script src="..."> accordingly.
  const injectedHtml = useMemo(() => {
    return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Zego Web Call</title>
  <style>
    html,body,#root { margin:0; padding:0; height:100%; width:100%; background:#000; }
    #container { height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; }
    #status { position:absolute; top:12px; left:12px; z-index:999; }
    #smallLocal { position:absolute; right:12px; bottom:120px; width:120px; height:160px; background:#222; z-index:999; border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
    #endBtn { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); background:red; padding:12px 24px; border-radius:999px; color:white; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <div id="root">
    <div id="container">
      <div id="status">Connecting to room: ${roomID}</div>
      <div id="bigVideo" style="flex:1; width:100%;"></div>
      <div id="smallLocal">You</div>
      <div id="endBtn">End Call</div>
    </div>
  </div>

  <!--
    Replace the script src with Zego's official web SDK URL if different.
    Common approaches: include the Zego UIKit for web, or Zego WebRTC SDK.
    Example (change if Zego docs show a different URL):
  -->
  <script src="https://unpkg.com/@zegocloud/zego-uikit-web@latest/dist/zego-uikit-web.js"></script>

  <script>
    // Helper: post events to RN
    function postEvent(type, payload) {
      const msg = { type, payload };
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify(msg));
      } else {
        console.log("RN bridge missing:", msg);
      }
    }

    // Minimal Zego init (pseudocode). Replace with official initialization from Zego docs.
    async function initZego() {
      try {
        postEvent('LOG', 'Starting Zego init');

        const appID = ${JSON.stringify(appID)};
        const token = ${JSON.stringify(token)};
        const userID = ${JSON.stringify(userID)};
        const roomID = ${JSON.stringify(roomID)};

        // ---- BEGIN: Example using Zego UIKit Web (replace with Zego docs snippet as needed) ----
        // NOTE: exact API names may differ. If Zego has example HTML/JS from docs, paste it here.
        // The code below demonstrates the concept: create Zego instance, join room, setup UI hooks.

       
        if (window.ZegoUIKit) {
          // Create the UIKit instance
          const kit = window.ZegoUIKit.create(appID, token);
          // joinRoom options depend on Zego doc. The following is illustrative:
          await kit.joinRoom({
            container: document.getElementById('bigVideo'),
            sharedLinks: [],
            localUser: { userID: userID, userName: 'Patient' },
            roomID: roomID,
            onUserJoined: (user) => {
              postEvent('USER_JOIN', user);
            },
            onUserLeft: (user) => {
              postEvent('USER_LEAVE', user);
            },
            onJoined: () => {
              postEvent('CONNECTED', { roomID });
            },
            onLeave: () => {
              postEvent('DISCONNECTED');
            }
          });

          // Simple end button to leave:
          document.getElementById('endBtn').addEventListener('click', async () => {
            try {
              await kit.leaveRoom();
            } catch (e) {
              console.error(e);
            }
            postEvent('END_CALL');
          });

        } else {
          // Fallback: Zego lib not loaded
          postEvent('ERROR', 'Zego UIKit lib not found in WebView. Verify CDN URL.');
        }
        // ---- END example ----

      } catch (err) {
        postEvent('ERROR', (err && err.message) || String(err));
      }
    }

    // Start initialization after load
    window.onload = function() {
      setTimeout(() => {
        initZego();
      }, 300);
    };
  </script>
</body>
</html>
    `;
  }, [appID, token, userID, roomID]);

  function handleMessage(event) {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const { type, payload } = data;
      console.log("WebView message:", type, payload);

      if (type === "CONNECTED") {
        // call connected; you can update UI or navigate
        // Example: keep user in same screen (video), or show timer
      } else if (type === "USER_JOIN") {
        // a user joined, payload likely user info
        // if doctor joined, you can notify
      } else if (type === "END_CALL") {
        // remote or local ended; navigate to call ended
        router.replace("./call-ended");
      } else if (type === "DISCONNECTED") {
        router.replace("./call-ended");
      } else if (type === "ERROR") {
        Alert.alert("Call error", payload || "Unknown error from web");
        router.replace("./call-ended");
      } else if (type === "LOG") {
        console.log("ZegoLog:", payload);
      }
    } catch (e) {
      console.warn("Invalid message from WebView", e);
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        ref={webRef}
        javaScriptEnabled
        domStorageEnabled
        source={{ html: injectedHtml }}
        onMessage={handleMessage}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        style={{ flex: 1, backgroundColor: "#000" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
