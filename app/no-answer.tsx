// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../src/constants/colors";

export default function NoAnswerScreen() {
  const router = useRouter();

  // 🔹 Receive doctorName, appointmentID, doctorID
  const { doctorName, doctorID, appointmentID } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* DOCTOR IMAGE */}
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.docImg}
        />

        {/* DOCTOR NAME */}
        <Text style={styles.docName}>{doctorName}</Text>
        <Text style={styles.docSpec}>Male-Female Infertility</Text>

        {/* NO ANSWER */}
        <Text style={styles.noAnswerText}>No Answer</Text>

        {/* Bell Notification */}
        <View style={styles.bellRow}>
          <Ionicons name="notifications-outline" size={20} color="#2E7D32" />
          <Text style={styles.bellText}>
            Tap on the bell icon to get notified when {doctorName} is{" "}
            <Text style={{ color: "#2E7D32", fontWeight: "600" }}>online</Text>
          </Text>
        </View>

        <Text style={styles.orSeparator}>──────   or   ──────</Text>

        {/* Chat Box */}
        <View style={styles.chatBox}>
          <Text style={styles.chatLine}>
            Start a <Text style={{ fontWeight: "700" }}>Chat Consultation</Text>{" "}
            with {doctorName} or consult another expert now.
          </Text>

          <View style={styles.chatButtons}>
            {/* More experts */}
            <TouchableOpacity
              style={styles.moreExpertsBtn}
              onPress={() => router.push("./doctors")}
            >
              <Text style={styles.moreExpertsText}>See More Experts</Text>
            </TouchableOpacity>

            {/* Start Chat */}
            <TouchableOpacity
              style={styles.startChatBtn}
              onPress={() => alert("Start Chat")}
            >
              <Text style={styles.startChatText}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },

  content: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  docImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  docName: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  docSpec: {
    fontSize: 14,
    color: "gray",
  },

  noAnswerText: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },

  bellRow: {
    marginTop: 18,
    backgroundColor: "#FFF7E3",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  bellText: {
    fontSize: 13,
    flex: 1,
    color: "#333",
  },

  orSeparator: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 13,
    color: "gray",
  },

  chatBox: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  chatLine: { fontSize: 14, marginBottom: 16 },

  chatButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  moreExpertsBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  moreExpertsText: {
    color: colors.primary,
    fontWeight: "600",
  },

  startChatBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },

  startChatText: {
    color: "white",
    fontWeight: "700",
  },
});
