import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../src/constants/colors";

export default function MyBookings() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("appointments");

  // Disclaimer Modal State
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // ----------------------------
  // Dummy appointment data (static for now)
  // ----------------------------
  const appointmentID = "APPT123";
  const doctorID = "doctorID";
  const doctorName = "Dr. Prem";

  return (
    <>
      <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerBackground}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "appointments" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("appointments")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "appointments" && styles.activeTabText,
              ]}
            >
              Appointments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "orders" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("orders")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "orders" && styles.activeTabText,
              ]}
            >
              Orders
            </Text>
          </TouchableOpacity>
        </View>

        {/* FILTER */}
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>Filter Appointments</Text>
          <Ionicons name="filter" size={20} color={colors.darkText} />
        </View>

        {/* -------------------------------------- */}
        {/*           APPOINTMENT CARD 1           */}
        {/* -------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.docName}>Dr. Prem</Text>
              <Text style={styles.docSpec}>Orthodontist</Text>
            </View>

            <View style={styles.statusBadgeUpcoming}>
              <Text style={styles.statusTextUpcoming}>Upcoming</Text>
            </View>

            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.docImg}
            />
          </View>

          {/* Date + Time */}
          <View style={styles.rowIcons}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            <Text style={styles.dateText}>Tuesday, 9/12/2025</Text>

            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.dateText}>11:30 AM</Text>
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                router.push({
                  pathname: "./appointment-details",
                })
              }
            >
              <Text style={styles.viewBtnText}>View Details</Text>
            </TouchableOpacity>

            {/* Start Call → open disclaimer */}
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => setShowDisclaimer(true)}
            >
              <Text style={styles.callBtnText}>Start Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* -------------------------------------- */}
        {/*           APPOINTMENT CARD 2           */}
        {/* -------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.docName}>Dr. Deepa Godara</Text>
              <Text style={styles.docSpec}>Orthodontist</Text>
            </View>

            <View style={styles.statusBadgeCompleted}>
              <Text style={styles.statusTextCompleted}>Completed</Text>
            </View>

            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=50" }}
              style={styles.docImg}
            />
          </View>

          {/* Date + Time */}
          <View style={styles.rowIcons}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            <Text style={styles.dateText}>Friday, 5/12/2025</Text>

            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.dateText}>10:30 AM</Text>
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                router.push({
                  pathname: "./appointment-details",
                })
              }
            >
              <Text style={styles.viewBtnText}>View Details</Text>
            </TouchableOpacity>
          </View>

          {/* Prescription Box */}
          <TouchableOpacity style={styles.prescriptionBox}>
            <Text style={styles.prescriptionTitle}>Check Prescription</Text>
            <Text style={styles.prescriptionSubtitle}>
              Dr. Deepa has suggested some solution
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ------------------------------------------------ */}
      {/*                  DISCLAIMER MODAL                */}
      {/* ------------------------------------------------ */}
      <Modal
        visible={showDisclaimer}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDisclaimer(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>Disclaimer</Text>

            <Text style={styles.modalText}>
              By continuing, you consent to this call being recorded for quality
              and support purposes. Please provide accurate details to help the
              doctor assist you effectively.{" "}
              <Text style={{ textDecorationLine: "underline" }}>
                Read Terms & Conditions..
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.modalProceedBtn}
              onPress={() => {
  setShowDisclaimer(false);

  router.push({
    pathname: "/calling-screen",
    params: {
      appointmentID: "APPT123",
      doctorID: "doctorID",
      doctorName: "Dr. Prem",
    },
  });
}}

            >
              <Text style={styles.modalProceedText}>Proceed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setShowDisclaimer(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

/* -------------------- */
/*        STYLES        */
/* -------------------- */

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },

  headerBackground: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGreen,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  headerTitle: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "700",
    color: colors.darkText,
  },

  tabsRow: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 10,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: colors.darkText,
  },

  tabText: {
    fontSize: 16,
    color: colors.darkText,
  },

  activeTabText: {
    color: "white",
    fontWeight: "600",
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 25,
    alignItems: "center",
  },

  filterText: {
    fontSize: 16,
    color: colors.darkText,
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 14,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  docName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkText,
  },

  docSpec: {
    fontSize: 13,
    color: colors.grayText,
  },

  statusBadgeUpcoming: {
    backgroundColor: "#FFE7B3",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusTextUpcoming: {
    color: "#B27300",
    fontSize: 12,
    fontWeight: "600",
  },

  statusBadgeCompleted: {
    backgroundColor: "#D4F7D5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusTextCompleted: {
    color: "#2A7A2C",
    fontSize: 12,
    fontWeight: "600",
  },

  docImg: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },

  rowIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },

  dateText: {
    marginRight: 16,
    fontSize: 14,
    color: colors.darkText,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  viewBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.primary,
  },

  viewBtnText: {
    color: colors.primary,
    fontWeight: "600",
  },

  callBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },

  callBtnText: {
    color: "white",
    fontWeight: "700",
  },

  prescriptionBox: {
    backgroundColor: "#E9E2FF",
    padding: 14,
    borderRadius: 12,
    marginTop: 14,
  },

  prescriptionTitle: {
    fontWeight: "700",
    fontSize: 15,
  },

  prescriptionSubtitle: {
    fontSize: 13,
    color: colors.grayText,
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 3,
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },

  modalText: {
    fontSize: 14,
    color: colors.darkText,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },

  modalProceedBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  modalProceedText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  modalCancelBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    marginBottom: 20,
  },

  modalCancelText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
