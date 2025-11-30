import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import colors from "../src/constants/colors";

export default function BasicInfo() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const appointmentDate = params.date;   // Received from Choose-Date
  const selectedSlot = params.slot;      // Received from Your-Concern

  const [gender, setGender] = useState("Prefer not to say");
  const [age, setAge] = useState("28 years");
  const [height, setHeight] = useState("171 cms");
  const [weight, setWeight] = useState("63 kg");

  const handleConfirm = () => {
    if (!gender || !age || !height || !weight) {
      alert("Please fill all fields");
      return;
    }

    // SEND data to appointment-confirmation
    router.push({
      pathname: "./appointment-confirmation",
      params: {
        date: params.date,
        slot: params.slot
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
          <Text style={styles.headerTitle}>Basic Info</Text>
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

      <Text style={styles.infoLabel}>Please confirm your basic information</Text>

      {/* GENDER */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Gender</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          style={styles.input}
          placeholder="Enter gender"
          placeholderTextColor="#999"
        />
      </View>

      {/* AGE */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Enter age"
          placeholderTextColor="#999"
        />
      </View>

      {/* HEIGHT */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Height</Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter height"
          placeholderTextColor="#999"
        />
      </View>

      {/* WEIGHT */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Weight</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter weight"
          placeholderTextColor="#999"
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

/* ------------------------- */
/*           STYLES          */
/* ------------------------- */
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

  infoLabel: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkText,
  },

  inputBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },

  inputLabel: {
    fontSize: 13,
    color: colors.grayText,
    marginBottom: 6,
  },

  input: {
    fontSize: 15,
    color: colors.darkText,
  },

  confirmBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 60,
    alignItems: "center",
  },

  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
