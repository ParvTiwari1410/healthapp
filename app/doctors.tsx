import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../src/constants/colors";

export default function DoctorsScreen() {
  const { concern } = useLocalSearchParams(); 
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.darkText} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{concern}</Text>

        <View style={styles.walletWrapper}>
          <Ionicons name="wallet-outline" size={20} color={colors.darkText} />
          <Text style={styles.amountText}>₹150</Text>
        </View>
      </View>

      {/* FILTER CHIPS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        {["All", "Hair", "Diabetes", "D", "Filter"].map((chip, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.chip,
              chip === concern ? styles.activeChip : null,
            ]}
          >
            <Text style={chip === concern ? styles.activeChipText : styles.chipText}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* DOCTOR CARDS */}
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.doctorImg}
            />

            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.docName}>Dr. Prem</Text>
                <Ionicons name="star" size={16} color="#f1b300" />
                <Text style={styles.rating}>4.5</Text>
              </View>

              <Text style={styles.speciality}>Gynecology + 2 others</Text>
              <Text style={styles.langs}>Hindi, English, Telugu</Text>
              <Text style={styles.exp}>Exp : 7 years</Text>
              <Text style={styles.free}>₹15/min  <Text style={{ color: "red" }}>Free (5min)</Text></Text>
            </View>
          </View>

          <View style={styles.cardButtons}>
            <TouchableOpacity 
  style={styles.scheduleBtn}
  onPress={() => {
    router.push({
      pathname: "./choose-consultation",
      params: { doctor: "Dr. Prem" },  // you can pass actual doctor object later
    });
  }}
>
  <Text style={styles.scheduleText}>Schedule</Text>
</TouchableOpacity>


            <TouchableOpacity style={styles.freeCallBtn}>
              <Text style={styles.freeCallText}>Free Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  /* HEADER */
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.darkText,
  },
  walletWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.darkText,
  },

  /* FILTER CHIPS */
  chipsRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  chipText: {
    color: colors.darkText,
  },
  activeChip: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.primary,
  },
  activeChipText: {
    color: colors.primary,
    fontWeight: "600",
  },

  /* DOCTOR CARDS */
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  doctorImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  docName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkText,
  },
  rating: {
    marginLeft: 4,
    fontSize: 13,
    color: colors.darkText,
  },
  speciality: {
    fontSize: 14,
    color: colors.grayText,
  },
  langs: {
    fontSize: 13,
    color: colors.grayText,
  },
  exp: {
    fontSize: 13,
    color: colors.grayText,
  },
  free: {
    fontSize: 13,
    marginTop: 3,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  scheduleBtn: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
  },
  scheduleText: {
    color: colors.primary,
    fontWeight: "600",
  },
  freeCallBtn: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  freeCallText: {
    color: "white",
    fontWeight: "600",
  },
});
