import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ ADDED
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../src/constants/colors";

const concerns = [
  { id: 1, name: "Hypertension", icon: "heart" },
  { id: 2, name: "Anxiety", icon: "chatbubble-ellipses-outline" },
  { id: 3, name: "Obesity", icon: "body-outline" },
  { id: 4, name: "Diabetes", icon: "medkit-outline" },
  { id: 5, name: "Obesity", icon: "fitness-outline" },
  { id: 6, name: "Hypertension", icon: "pulse-outline" },
  { id: 7, name: "Rubella", icon: "bandage-outline" },
  { id: 8, name: "Hypothermia", icon: "snow-outline" },
  { id: 9, name: "Frostbite", icon: "thermometer-outline" },
];

export default function SelectConcernScreen() {
  const [selected, setSelected] = useState(1);
  const router = useRouter();     // ✅ ADDED

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={26} color={colors.darkText} />
        <Text style={styles.headerTitle}>Select Concern</Text>
      </View>

      {/* TOP CONCERNS */}
      <Text style={styles.topTitle}>Top Concerns</Text>

      {/* GRID */}
      <FlatList
        data={concerns}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const isActive = selected === item.id;

          return (
            <TouchableOpacity
              style={[styles.card, isActive && styles.activeCard]}
              onPress={() => {
                setSelected(item.id);

                // ✅ Navigate to /doctors with concern name
                router.push({
                  pathname: "./doctors",
                  params: { concern: item.name },
                });
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={32}
                color={isActive ? colors.primary : colors.darkText}
              />
              <Text style={[styles.cardText, isActive && styles.activeText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={26} color="white" />
        <Ionicons name="cart-outline" size={26} color="white" />
        
        <View style={styles.activeTab}>
          <Ionicons name="heart-outline" size={26} color={colors.primary} />
        </View>

        <Ionicons name="chatbubbles-outline" size={26} color="white" />
        <Ionicons name="notifications-outline" size={26} color="white" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // HEADER
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.darkText,
  },

  // TOP CONCERNS
  topTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "500",
    color: colors.darkText,
  },

  // GRID
  grid: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: "30%",
    backgroundColor: colors.lightGreen,
    marginHorizontal: "1.66%",
    marginVertical: 10,
    borderRadius: 100,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCard: {
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  cardText: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: colors.grayText,
  },
  activeText: {
    color: colors.primary,
    fontWeight: "600",
  },

  // BOTTOM NAV
  bottomNav: {
    position: "absolute",
    bottom: 0,
    height: 70,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  activeTab: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
  },
});
