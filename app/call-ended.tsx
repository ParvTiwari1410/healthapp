// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CallEndedScreen() {
  const router = useRouter();

  // 🔹 Receive dynamic call info from video-call screen
  const { appointmentID, doctorID, doctorName } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      {/* CLOSE ICON */}
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => router.replace("./my-bookings")}
      >
        <Ionicons name="close" size={28} color="#333" />
      </TouchableOpacity>

      {/* WALLET BALANCE ICON */}
      <View style={styles.walletRow}>
        <Ionicons name="wallet-outline" size={22} color="#333" />
        <Text style={styles.walletAmount}>₹ 150</Text>
      </View>

      {/* DOCTOR IMAGE */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.doctorImg}
      />

      {/* DOCTOR NAME */}
      <Text style={styles.doctorName}>{doctorName}</Text>
      <View style={styles.dotOnline} />

      {/* CALL ENDED STATUS */}
      <View style={styles.statusRow}>
        <Ionicons name="cellular" size={18} color="green" />
        <Text style={styles.callEndedText}>Call Ended</Text>
      </View>

      {/* METRICS */}
      <View style={styles.metricsRow}>

        {/* Duration */}
        <View style={styles.metricBox}>
          <Ionicons name="call-outline" size={20} color="#666" />
          <Text style={styles.metricLabel}>Consultation Duration</Text>
          <Text style={styles.metricValue}>05:56</Text>
          {/* Later: replace with calculated duration */}
        </View>

        {/* Deduction */}
        <View style={styles.metricBox}>
          <Ionicons name="card-outline" size={22} color="#666" />
          <Text style={styles.metricLabel}>Total Amount Deducted</Text>
          <Text style={styles.metricValue}>₹ 369</Text>
          {/* Later: replace with actual call price */}
        </View>

      </View>

      {/* CALL AGAIN BUTTON */}
      <TouchableOpacity
        style={styles.callAgainBtn}
        onPress={() =>
          router.replace({
            pathname: "./calling-screen",
            params: { appointmentID, doctorID, doctorName },
          })
        }
      >
        <Text style={styles.callAgainText}>Call Again</Text>
      </TouchableOpacity>

      {/* DONE BUTTON */}
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() => router.replace("./my-bookings")}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>

    </View>
  );
}

/* ----------------------------- STYLES ----------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },

  closeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },

  walletRow: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  walletAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  doctorImg: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginTop: 40,
  },

  doctorName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  dotOnline: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 6,
    marginTop: 4,
  },

  statusRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    gap: 6,
  },

  callEndedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 40,
  },

  metricBox: {
    flex: 1,
    alignItems: "center",
  },

  metricLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
    color: "#333",
  },

  callAgainBtn: {
    marginTop: 80,
    width: "85%",
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#2E7D32",
    borderRadius: 12,
    alignItems: "center",
  },

  callAgainText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
  },

  doneBtn: {
    marginTop: 12,
    width: "85%",
    paddingVertical: 15,
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    alignItems: "center",
  },

  doneText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
