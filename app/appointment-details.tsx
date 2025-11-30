import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import colors from "../src/constants/colors";

export default function AppointmentDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ******** ADDED ********
  const appointmentDate = params.date;
  const appointmentTime = params.time;
  // ************************

  // dropdown states
  const [showAppointment, setShowAppointment] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={colors.darkText} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Appointment Details</Text>
      </View>

      {/* DOCTOR CARD */}
      <View style={styles.doctorCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.docImg}
        />

        <View style={{ marginTop: 10 }}>
          <Text style={styles.docLabel}>Doctor name</Text>
          <Text style={styles.docValue}>Dr. Prem</Text>
        </View>
      </View>

      {/* SECTION — Appointment Details */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowAppointment(!showAppointment)}
      >
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        <Ionicons
          name={showAppointment ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {showAppointment && (
        <View style={styles.sectionBox}>
          <Row label="Appointment ID" value="APPLF10247816" />
          <Row label="Appointment type" value="Freeaudio" />
          <Row label="Appointment fee" value="0 INR" />
          <Row label="Duration" value="1 min" />

          {/* ******** UPDATED ******** */}
          <Row
            label="Appointment date"
            value={appointmentDate ? String(appointmentDate) : "19 Nov, 2024"}
          />
          <Row
            label="Appointment time"
            value={appointmentTime ? String(appointmentTime) : "01:51 PM"}
          />
          {/* ************************* */}

          <Row label="Booking Status" value="Completed" />
          <Row label="Routine status" value="Not assigned" />
        </View>
      )}

      {/* SECTION — Symptoms Details */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowSymptoms(!showSymptoms)}
      >
        <Text style={styles.sectionTitle}>Symptoms Details</Text>
        <Ionicons
          name={showSymptoms ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {showSymptoms && (
        <View style={styles.sectionBox}>
          <Row label="Symptoms" value="Anxiety" />
          <Row label="Description" value="N/A" />
          <Row label="Severity" value="Moderate" />
          <Row label="Symptoms Duration" value="weeks" />
          <Row label="Sleep pattern" value="N/A" />
        </View>
      )}

      {/* SECTION — Coupons Details */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowCoupons(!showCoupons)}
      >
        <Text style={styles.sectionTitle}>Coupons Details</Text>
        <Ionicons
          name={showCoupons ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {showCoupons && (
        <View style={styles.sectionBox}>
          <Row label="Coupon Code" value="N/A" />
          <Row label="Coupon Discount" value="N/A" />
          <Row label="Discount amount" value="0" />
        </View>
      )}

      {/* SECTION — Booking Details */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowBooking(!showBooking)}
      >
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <Ionicons
          name={showBooking ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {showBooking && (
        <View style={styles.sectionBox}>
          <Row label="Booked by" value="Patient" />
          <Row label="Booking date" value="19 Nov, 2024" />
          <Row label="Booking time" value="01:51 PM" />
          <Row label="Payment date" value="29 Jan, 2025" />
          <Row label="Payment Time" value="01:58 PM" />
        </View>
      )}

      {/* MEDICAL REPORT */}
      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionTitle}>Medical Report</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportBtn}>
        <Text style={styles.reportBtnText}>Attach report</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

/* --- Reusable Row Component --- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

/* ---------------------- */
/*         STYLES         */
/* ---------------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: colors.lightGreen,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 16,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 10,
    color: colors.darkText,
  },

  doctorCard: {
    backgroundColor: "#fff",
    marginTop: -30,
    borderRadius: 14,
    elevation: 2,
    padding: 20,
    alignItems: "center",
  },

  docImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  docLabel: {
    fontSize: 14,
    color: "#555",
  },

  docValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
  },

  sectionButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  sectionBox: {
    marginTop: 5,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  rowLabel: {
    fontSize: 14,
    color: "#666",
  },

  rowValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  reportBtn: {
    backgroundColor: colors.primary,
    marginTop: 10,
    marginBottom: 40,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  reportBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
