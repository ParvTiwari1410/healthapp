// @ts-nocheck

import { Ionicons } from "@expo/vector-icons";
import {
  ZegoUIKitPrebuiltCallService,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CallingScreen() {
  const router = useRouter();

  // 🔹 Receive real appointment & doctor info
  const { appointmentID, doctorID, doctorName } = useLocalSearchParams();

  useEffect(() => {
    let doctorJoined = false;

    // 1️⃣ Start the actual Zego call
    ZegoUIKitPrebuiltCallService.startCall({
      callID: appointmentID, // Appointment ID becomes CallID
      isVideoCall: true,
      invitees: [{ userID: doctorID, userName: doctorName }],
    });

    // 2️⃣ Detect doctor joining the call room
    ZegoUIKitPrebuiltCallService.onUserJoin = (users) => {
      if (users.some((u) => u.userID === doctorID)) {
        doctorJoined = true;
        console.log("Doctor joined the call");

        router.replace({
          pathname: "./video-call",
          params: { appointmentID, doctorID, doctorName },
        });
      }
    };

    // 3️⃣ 25-second timeout → No Answer screen
    const timer = setTimeout(() => {
      if (!doctorJoined) {
        ZegoUIKitPrebuiltCallService.hangUp(); // End actual call
        router.replace({
          pathname: "./no-answer",
          params: { doctorName },
        });
      }
    }, 25000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* RINGING TEXT */}
      <Text style={styles.ringingText}>Ringing...</Text>

      {/* DOCTOR IMAGE */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.doctorImg}
      />

      {/* ACTION BUTTONS ROW */}
      <View style={styles.actionRow}>

        {/* Mute */}
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="mic-off" size={26} color="#fff" />
        </TouchableOpacity>

        {/* Speaker */}
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="volume-high" size={26} color="#fff" />
        </TouchableOpacity>

        {/* End Call */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.endCallBtn]}
          onPress={() => {
            ZegoUIKitPrebuiltCallService.hangUp();
            router.back();
          }}
        >
          <Ionicons name="call" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* DOCTOR NAME TAG */}
      <Text style={styles.doctorLabel}>{doctorName}</Text>
    </View>
  );
}

/* ---------------------- */
/*         STYLES         */
/* ---------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C4D6C4",
    alignItems: "center",
    paddingTop: 100,
  },

  ringingText: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 40,
    fontWeight: "600",
  },

  doctorImg: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 50,
  },

  actionRow: {
    flexDirection: "row",
    gap: 35,
    marginTop: 40,
  },

  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  endCallBtn: {
    backgroundColor: "red",
  },

  doctorLabel: {
    marginTop: 40,
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
