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

export default function PaymentSuccess() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Extract values passed from appointment-confirmation
  const appointmentDate = params.date;
  const appointmentTime = params.time;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.mainCard}>
        
        {/* Doctor Image */}
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.docImg}
        />

        {/* Tick Icon */}
        <View style={styles.tickCircle}>
          <Ionicons name="checkmark-circle" size={40} color={colors.primary} />
        </View>

        <Text style={styles.paidText}>Paid ₹50</Text>
        <Text style={styles.subText}>Chat Consultation Booked Successfully</Text>

        {/* Wallet Box */}
        <View style={styles.walletBox}>
          <Ionicons name="wallet-outline" size={26} color={colors.darkText} />
          <Text style={styles.availBalance}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹ 660</Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.bookingBtn}
          onPress={() =>
            router.push({
              pathname: "./my-bookings",
              params: {
                date: appointmentDate,
                time: appointmentTime,
              },
            })
          }
        >
          <Text style={styles.bookingText}>Check Bookings</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DFF2DD",
  },

  mainCard: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  docImg: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },

  tickCircle: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 4,
    marginTop: -25,
    marginBottom: 20,
  },

  paidText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.darkText,
  },

  subText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.grayText,
    textAlign: "center",
  },

  walletBox: {
    marginTop: 40,
    alignItems: "center",
  },

  availBalance: {
    marginTop: 8,
    fontSize: 15,
    color: colors.grayText,
  },

  balanceAmount: {
    marginTop: 6,
    fontSize: 32,
    fontWeight: "700",
    color: colors.darkText,
  },

  bookingBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    width: "90%",
    borderRadius: 12,
    marginTop: 60,
    alignItems: "center",
  },

  bookingText: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
  },
});
