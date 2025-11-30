import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../src/constants/colors";

export default function ChooseTimeSlot() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState("");
  const params = useLocalSearchParams();
  const selectedDate = params.date;

  // Morning slots (exact as screenshot)
  const morningSlots = ["09:00 AM", "09:35 AM", "10:05 AM"];

  // Afternoon slots (exact as screenshot)
  const afternoonSlots = ["12:00 PM", "12:35 AM", "01:05 PM"];

  // Evening slots (your custom list)
  const eveningSlots = [
    "05:00 PM",
    "05:30 PM",
    "06:05 PM",
    "06:35 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:35 PM",
  ];

  const handleConfirm = () => {
  if (!selectedTime) {
    alert("Please select a time slot");
    return;
  }

  router.push({
    pathname: "/your-concern",
    params: {
      date: selectedDate, 
      slot: selectedTime,   // pass selected time
    },
  });
};


  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.headerBackground}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Time Slot</Text>
        </View>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
      </View>

      {/* DOCTOR CARD */}
      <View style={styles.doctorCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.docImg}
        />
        <View>
          <Text style={styles.docName}>Dr. Prem</Text>
          <Text style={styles.docSpeciality}>Male-Female Infertility</Text>
          <Text style={styles.docSpeciality}>Chat Consultation - Free</Text>
        </View>
      </View>

      <Text style={styles.pickLabel}>Pick a time slot</Text>

      {/* MORNING */}
      <Text style={styles.sectionTitle}>Morning</Text>
      <View style={styles.grid}>
        {morningSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeBox,
              selectedTime === slot && styles.activeTimeBox,
            ]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === slot && styles.activeTimeText,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* AFTERNOON */}
      <Text style={styles.sectionTitle}>Afternoon</Text>
      <View style={styles.grid}>
        {afternoonSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeBox,
              selectedTime === slot && styles.activeTimeBox,
            ]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === slot && styles.activeTimeText,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* EVENING */}
      <Text style={styles.sectionTitle}>Evening</Text>
      <View style={styles.grid}>
        {eveningSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeBox,
              selectedTime === slot && styles.activeTimeBox,
            ]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === slot && styles.activeTimeText,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Appointment</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

/* ------------------------------------ */
/*               STYLES                 */
/* ------------------------------------ */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  /* Green Header */
  headerBackground: {
    backgroundColor: colors.lightGreen,
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },

  circle1: {
    width: 220,
    height: 220,
    backgroundColor: "#DDEFE1",
    borderRadius: 110,
    position: "absolute",
    top: -70,
    right: -50,
  },

  circle2: {
    width: 150,
    height: 150,
    backgroundColor: "#DDEFE1",
    borderRadius: 75,
    position: "absolute",
    top: 30,
    left: -30,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.darkText,
  },

  /* PROGRESS BAR */
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 15,
    marginHorizontal: 20,
  },
  progressDot: {
    flex: 1,
    height: 4,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },

  /* Doctor section */
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 15,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 20,
    elevation: 2,
  },
  docImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  docName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkText,
  },
  docSpeciality: {
    fontSize: 14,
    color: colors.grayText,
  },

  pickLabel: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkText,
  },

  /* Sections */
  sectionTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "600",
    color: colors.darkText,
  },

  /* Time Slots */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 14,
    marginHorizontal: 20,
  },

  timeBox: {
    width: "30%",
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },

  activeTimeBox: {
    backgroundColor: colors.primary,
  },

  timeText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.darkText,
  },

  activeTimeText: {
    color: "white",
  },

  /* Button */
  confirmBtn: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 60,
  },

  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
