import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../src/constants/colors";

export default function YourConcern() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const selectedSlot = params.slot; // ← IMPORTANT: time slot received here

  const [concern, setConcern] = useState("Diabetes");
  const [severity, setSeverity] = useState(1);
  const [durationValue, setDurationValue] = useState("28");
  const [durationType, setDurationType] = useState("Days");

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const concernList = [
    "Hypertension",
    "Anxiety",
    "Obesity",
    "Diabetes",
    "Rubella",
    "Hypothermia",
    "Frostbite",
  ];

  return (
    <ScrollView style={styles.container}>
      {/* BEAUTIFUL HEADER */}
      <View style={styles.headerBackground}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Concern</Text>
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
          <Text style={styles.docSpeciality}>Gynecology + 2 others</Text>
          <Text style={styles.docSpeciality}>Instant Call - ₹ 15/min</Text>
        </View>
      </View>

      {/* SELECT CONCERN */}
      <Text style={styles.label}>Please select a concern</Text>

      {/* DROPDOWN INPUT */}
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.inputText}>{concern}</Text>
        <Ionicons
          name={dropdownVisible ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.grayText}
        />
      </TouchableOpacity>

      {/* LIST DROPDOWN */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {concernList.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setConcern(item);
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* SEVERITY SLIDER */}
      <Text style={styles.label}>Select severity of your concern</Text>

      <Slider
        style={{ width: "100%", height: 40, marginTop: 10 }}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={severity}
        onValueChange={(val) => setSeverity(val)}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.primary}
      />

      {/* SEVERITY LABELS */}
      <View style={styles.severityLabels}>
        <Text
          style={[styles.severityText, severity === 0 && styles.activeSeverity]}
        >
          Mild
        </Text>
        <Text
          style={[styles.severityText, severity === 1 && styles.activeSeverity]}
        >
          Moderate
        </Text>
        <Text
          style={[styles.severityText, severity === 2 && styles.activeSeverity]}
        >
          Severe
        </Text>
      </View>

      {/* DURATION */}
      <Text style={styles.label}>How long have you been facing?</Text>

      <View style={styles.inputBox}>
        <TextInput
          value={durationValue}
          onChangeText={setDurationValue}
          keyboardType="number-pad"
          style={styles.inputText}
        />
        <Ionicons name="chevron-down" size={18} color={colors.grayText} />
      </View>

      {/* RADIO BUTTONS */}
      <View style={styles.radioRow}>
        {["Days", "Weeks", "Months", "Year"].map((type) => (
          <TouchableOpacity
            key={type}
            style={styles.radioOption}
            onPress={() => setDurationType(type)}
          >
            <View
              style={[
                styles.radioCircle,
                durationType === type && styles.radioChecked,
              ]}
            />
            <Text style={styles.radioLabel}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PROCEED BUTTON */}
      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => {
          if (!concern || concern.trim() === "") {
            alert("Please select a concern");
            return;
          }

          if (!durationValue || durationValue.trim() === "") {
            alert("Please enter duration");
            return;
          }

          // PASS SLOT → next screen
          router.push({
            pathname: "/basic-info",
            params: {
              date: params.date,
              slot: params.slot
              
            },
          });
        }}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------------- */
/*        STYLES          */
/* ---------------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
    top: -70,
    right: -40,
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

  /* DOCTOR CARD */
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 15,
    backgroundColor: "#fff",
    padding: 16,
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

  /* Labels */
  label: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
    color: colors.darkText,
  },

  /* Input Box */
  inputBox: {
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputText: {
    fontSize: 15,
    color: colors.darkText,
  },

  /* DROPDOWN */
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 2,
    paddingVertical: 5,
    elevation: 4,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  dropdownText: {
    fontSize: 15,
    color: colors.darkText,
  },

  /* Severity */
  severityLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  severityText: {
    fontSize: 14,
    color: colors.grayText,
  },

  activeSeverity: {
    color: colors.primary,
    fontWeight: "700",
  },

  /* Radio Buttons */
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  radioChecked: {
    backgroundColor: colors.primary,
  },

  radioLabel: {
    fontSize: 14,
    color: colors.darkText,
  },

  /* Proceed */
  proceedBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 60,
    alignItems: "center",
  },
  proceedText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
