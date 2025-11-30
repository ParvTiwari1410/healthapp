import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../src/constants/colors";

export default function ChooseConsultation() {
  const router = useRouter();
  const [selected, setSelected] = useState("video");

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
          <Text style={styles.headerTitle}>Choose Consultation</Text>
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

      {/* PHONE CONSULTATION */}
      <View style={styles.optionBox}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.optionTitle}>Phone Consultation</Text>
            <Text style={styles.price}>₹ 15/min</Text>
            <Text style={styles.duration}>(20min)</Text>
          </View>
          <TouchableOpacity onPress={() => setSelected("phone")}>
            <Ionicons
              name={selected === "phone" ? "checkmark-circle" : "ellipse-outline"}
              size={26}
              color={selected === "phone" ? colors.primary : colors.grayText}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* VIDEO CONSULTATION */}
      <View style={styles.optionBox}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.optionTitle}>Video Consultation</Text>
            <Text style={styles.price}>₹ 35/min</Text>
            <Text style={styles.duration}>(30min)</Text>
          </View>
          <TouchableOpacity onPress={() => setSelected("video")}>
            <Ionicons
              name={selected === "video" ? "checkmark-circle" : "ellipse-outline"}
              size={26}
              color={selected === "video" ? colors.primary : colors.grayText}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* CHAT CONSULTATION */}
      <View style={styles.optionBox}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.optionTitle}>Chat Consultation</Text>
            <Text style={styles.price}>₹ 50</Text>
            <Text style={styles.duration}>Valid: 72 hours</Text>
          </View>
          <TouchableOpacity onPress={() => setSelected("chat")}>
            <Ionicons
              name={selected === "chat" ? "checkmark-circle" : "ellipse-outline"}
              size={26}
              color={selected === "chat" ? colors.primary : colors.grayText}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* PROCEED BUTTON */}
      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => router.push("/choose-date")}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  /* HEADER BACKGROUND */
  headerBackground: {
    backgroundColor: colors.lightGreen,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },

  circle1: {
    width: 200,
    height: 200,
    backgroundColor: "#DDEFE1",
    borderRadius: 100,
    position: "absolute",
    top: -50,
    right: -50,
  },

  circle2: {
    width: 150,
    height: 150,
    backgroundColor: "#DDEFE1",
    borderRadius: 75,
    position: "absolute",
    top: 20,
    left: -30,
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

  /* DOCTOR CARD */
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

  docImg: { width: 60, height: 60, borderRadius: 10 },
  docName: { fontSize: 18, fontWeight: "700", color: colors.darkText },
  docSpeciality: { fontSize: 14, color: colors.grayText },

  /* CONSULTATION OPTION BOXES */
  optionBox: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    elevation: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
  },

  price: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkText,
  },

  duration: {
    fontSize: 13,
    color: colors.grayText,
  },

  /* BUTTON */
  proceedBtn: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 60,
    marginHorizontal: 16,
  },

  proceedText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
