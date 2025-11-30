// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../src/constants/colors";

export default function CallDisconnected() {
  const router = useRouter();

  // Receive params passed from video-call.tsx
  const { appointmentID, doctorID, doctorName } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      {/* CLOSE BUTTON */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.replace("./my-bookings")}
      >
        <Ionicons name="close" size={26} color={colors.darkText} />
      </TouchableOpacity>

      {/* WALLET ICON + BALANCE */}
      <View style={styles.topRight}>
        <Ionicons name="wallet-outline" size={22} color={colors.darkText} />
        <Text style={styles.balanceText}>₹ 150</Text>
      </View>

      {/* DOCTOR IMAGE */}
      <Image
        source={{ uri: "https://i.pravatar.cc/200?img=12" }}
        style={styles.doctorImg}
      />

      {/* DOCTOR NAME */}
      <Text style={styles.doctorName}>{doctorName}</Text>

      {/* GREEN DOT */}
      <View style={styles.greenDot} />

      {/* CALL DISCONNECTED STATUS */}
      <View style={styles.centerStatus}>
        <Ionicons name="cellular-outline" size={18} color="red" />
        <Text style={styles.statusText}>Call Disconnected</Text>
      </View>

      {/* CONSULTATION INFO */}
      <View style={styles.infoRow}>

        {/* Duration */}
        <View style={styles.infoBox}>
          <Ionicons name="call-outline" size={20} color={colors.darkText} />
          <Text style={styles.infoLabel}>Consultation Duration</Text>
          <Text style={styles.infoValue}>05:56</Text>
          {/* later = calculate from callInfo */}
        </View>

        {/* Deduction */}
        <View style={styles.infoBox}>
          <Ionicons name="wallet-outline" size={20} color={colors.darkText} />
          <Text style={styles.infoLabel}>Total Amount Deducted</Text>
          <Text style={styles.infoValue}>₹ 369</Text>
        </View>
      </View>

      {/* LOW BALANCE BOX */}
      <View style={styles.lowBalanceBox}>
        <Text style={styles.lowTitle}>Low Balance</Text>
        <Text style={styles.lowSubtitle}>
          Your call ended due to low balance. Add at least ₹25 to continue 
          speaking with {doctorName}.
        </Text>

        <TouchableOpacity style={styles.rechargeBtn}>
          <Text style={styles.rechargeText}>Recharge now</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

/* ----------------------- STYLES ----------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },

  closeBtn: {
    position: "absolute",
    top: 60,
    left: 20,
  },

  topRight: {
    position: "absolute",
    top: 60,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
  },

  doctorImg: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginTop: 20,
  },

  doctorName: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    color: colors.darkText,
  },

  greenDot: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginTop: 4,
  },

  centerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  statusText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 30,
  },

  infoBox: {
    alignItems: "center",
    width: "45%",
  },
  infoLabel: {
    fontSize: 12,
    color: colors.grayText,
    marginTop: 6,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
    color: colors.darkText,
  },

  lowBalanceBox: {
    backgroundColor: "#F8F1DA",
    width: "90%",
    padding: 18,
    borderRadius: 12,
    marginTop: 40,
  },

  lowTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkText,
  },

  lowSubtitle: {
    fontSize: 13,
    marginTop: 6,
    color: colors.grayText,
    lineHeight: 18,
  },

  rechargeBtn: {
    marginTop: 18,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  rechargeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
