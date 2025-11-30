import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../src/constants/colors";

export default function ChooseDateScreen() {
  const router = useRouter();

  // REAL LIVE DATE (today)
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // GENERATE TODAY + DECEMBER DATES
  const dates = useMemo(() => {
    const arr = [];

    // Today entry
    arr.push({
      day: today.getDate().toString().padStart(2, "0"),
      monthShort: today.toLocaleDateString("en-GB", { month: "short" }),
      weekday: today.toLocaleDateString("en-US", { weekday: "long" }),
      fullDate: todayFormatted,
      isToday: true,
    });

    // December 2025 dates
    for (let i = 1; i <= 31; i++) {
      const d = new Date(2025, 11, i);
      arr.push({
        day: i < 10 ? `0${i}` : `${i}`,
        monthShort: "Dec",
        weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
        fullDate: d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        isToday: false,
      });
    }

    return arr;
  }, []);

  // DEFAULT SELECTED DATE = TODAY
  const [selected, setSelected] = useState(todayFormatted);

  return (
    <ScrollView style={styles.container}>
      {/* BEAUTIFUL HEADER */}
      <View style={styles.headerBackground}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Date</Text>
        </View>
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
        </View>
      </View>

      {/* SELECTED DATE CARD */}
      <View style={styles.selectedCard}>
        <Ionicons name="calendar-outline" size={24} color={colors.primary} />
        <Text style={styles.selectedDateText}>{selected}</Text>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {/* LABEL */}
      <Text style={styles.pickLabel}>Pick Appointment Date</Text>

      {/* DATE GRID */}
      <View style={styles.grid}>
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateBox,
              selected === item.fullDate && styles.activeDateBox,
            ]}
            onPress={() => setSelected(item.fullDate)}
          >
            <Text
              style={[
                styles.dateNumber,
                selected === item.fullDate && styles.activeDateText,
              ]}
            >
              {item.day} {item.monthShort}
            </Text>
            <Text
              style={[
                styles.weekday,
                selected === item.fullDate && styles.activeDateText,
              ]}
            >
              {item.weekday}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CONFIRM BUTTON — FIXED PARAM PASSING */}
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => {
          if (!selected) return alert("Please select a date");

          router.push({
            pathname: "./choose-timeslot",
            params: { date: selected },
          });
        }}
      >
        <Text style={styles.confirmText}>Confirm Date</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

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
    top: -80,
    right: -50,
  },

  circle2: {
    width: 160,
    height: 160,
    backgroundColor: "#DDEFE1",
    borderRadius: 80,
    position: "absolute",
    top: 20,
    left: -40,
  },

  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.darkText,
  },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 15,
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 16,
    borderRadius: 14,
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

  selectedCard: {
    backgroundColor: colors.lightGreen,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginHorizontal: 16,
    alignItems: "center",
  },

  selectedDateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
  },

  pickLabel: {
    marginTop: 25,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
    marginHorizontal: 16,
  },

  dateBox: {
    width: "30%",
    backgroundColor: "#F1F1F1",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  activeDateBox: {
    backgroundColor: colors.primary,
  },

  dateNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
  },

  weekday: {
    fontSize: 12,
    color: colors.grayText,
  },

  activeDateText: {
    color: "white",
  },

  confirmBtn: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 60,
    marginHorizontal: 16,
  },

  confirmText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 15,
    marginHorizontal: 16,
  },

  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },

  activeDot: {
    backgroundColor: colors.primary,
  },
});
