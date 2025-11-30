import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import colors from "../src/constants/colors";

export default function AppointmentConfirmation() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const appointmentDate = params.date; 
  const selectedSlot = params.slot;

  const [finalTime, setFinalTime] = useState("");

  // -----------------------------------------------------
  //  RANDOM TIME GENERATOR BASED ON SELECTED TIME SLOT
  // -----------------------------------------------------
  useEffect(() => {
    if (!selectedSlot) return;

    // Convert slot to string
    const start = String(selectedSlot);

    // Auto-create end time = +30 minutes
    const end = addThirtyMinutes(start);

    const randomTime = generateRandomTime(start, end);
    setFinalTime(randomTime);

  }, [selectedSlot]);

  // Adds +30 minutes to the selected slot (e.g., 7:00 PM → 7:30 PM)
  function addThirtyMinutes(timeStr: string): string {
    const normalized = timeStr.replace(/\s+/g, " ").trim();
    const [time, modifier] = normalized.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const totalMins = hours * 60 + minutes + 30;

    let h = Math.floor(totalMins / 60);
    let m = totalMins % 60;
    const suffix = h >= 12 ? "PM" : "AM";

    if (h === 0) h = 12;
    else if (h > 12) h -= 12;

    return `${h}:${m.toString().padStart(2, "0")} ${suffix}`;
  }

  // Generate a random time between start & end
  function generateRandomTime(startStr: string, endStr: string): string {

    function parseTime(t: string): number {
      const normalized = t.replace(/\s+/g, " ").trim();
      const [time, modifier] = normalized.split(" ");
      const [hoursStr, minutesStr] = time.split(":");

      let hours = Number(hoursStr);
      const minutes = Number(minutesStr);

      if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

      return hours * 60 + minutes;
    }

    function formatTime(mins: number): string {
      let h = Math.floor(mins / 60);
      const m = mins % 60;

      const suffix = h >= 12 ? "PM" : "AM";

      if (h === 0) h = 12;
      else if (h > 12) h -= 12;

      return `${h}:${m.toString().padStart(2, "0")} ${suffix}`;
    }

    const startMin = parseTime(startStr);
    const endMin = parseTime(endStr);

    if (endMin <= startMin) return formatTime(startMin);

    const randomMin = Math.floor(Math.random() * (endMin - startMin)) + startMin;
    return formatTime(randomMin);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.docImg}
        />

        <View style={styles.tickWrapper}>
          <Ionicons name="checkmark-circle" size={32} color={colors.primary} />
        </View>

        <Text style={styles.title}>Appointment Confirmed</Text>

        <Text style={styles.subtitle}>
          Thank you for choosing our Experts to help guide you
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Expert</Text>
          <Text style={styles.value}>Dr. Prem</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Appointment Date</Text>
          <Text style={styles.value}>{appointmentDate}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Appointment Time</Text>
          <Text style={styles.value}>{finalTime}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Consultation Type</Text>
          <Text style={styles.value}>Phone Consultation</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Current Wallet Balance</Text>
          <Text style={styles.value}>₹ 660</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Consultation Fee</Text>
          <Text style={styles.value}>₹ 50</Text>
        </View>
      </View>

      <TouchableOpacity
  style={styles.payBtn}
  onPress={() =>
    router.push({
      pathname: "./payment-success",
      params: {
        date: appointmentDate,
        time: finalTime,
      }
    })
  }
>
  <Text style={styles.payText}>Make payment</Text>
</TouchableOpacity>

    </ScrollView>
  );
}

/* ---------------------- */
/*         STYLES         */
/* ---------------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },

  card: {
    backgroundColor: "#E9F3E9",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  docImg: {
    width: 110,
    height: 110,
    borderRadius: 18,
  },

  tickWrapper: {
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    color: colors.darkText,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 14,
    color: colors.grayText,
    width: "90%",
  },

  row: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 15,
    color: colors.grayText,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.darkText,
  },

  payBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },

  payText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
