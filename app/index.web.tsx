
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const scenarios = [
  {
    title: "Vehicle approaching",
    description: "A car is moving toward the crossing.",
    vehicle: "MOVING",
    light: "GREEN",
    safeToCross: false,
  },
  {
    title: "Vehicle stopped",
    description: "The vehicle has stopped at the red signal.",
    vehicle: "STOPPED",
    light: "RED",
    safeToCross: true,
  },
];

export default function SafeStreetWeb() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const scenario = scenarios[scenarioIndex];

  function decide(cross: boolean) {
    const correct = cross === scenario.safeToCross;

    setFeedback(
      correct
        ? cross
          ? "Correct! The vehicle is stopped. Check both directions before crossing."
          : "Good decision. Wait until the vehicle has stopped and the road is safe."
        : cross
          ? "Danger! The vehicle is approaching. Wait until traffic stops and check both directions."
          : "In this scenario, the vehicle has stopped. Check both directions before crossing."
    );

    if (correct) setScore((current) => current + 1);
  }

  function nextScenario() {
    setScenarioIndex((current) => (current + 1) % scenarios.length);
    setFeedback("");
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>SAFESTREET XR</Text>
      <Text style={styles.tagline}>See the road. Think. Stay safe.</Text>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>INTERACTIVE SAFETY LAB</Text>
        <Text style={styles.heading}>Would you cross?</Text>
        <Text style={styles.muted}>
          Study the traffic situation and make your decision.
        </Text>

        <View style={styles.road}>
          <View style={styles.roadLine} />
          <View style={styles.crossing}>
            {Array.from({ length: 6 }, (_, i) => (
              <View key={i} style={styles.stripe} />
            ))}
          </View>
          <View style={styles.trafficLight}>
            <View
              style={[
                styles.bulb,
                scenario.light === "RED" && styles.red,
              ]}
            />
            <View
              style={[
                styles.bulb,
                scenario.light === "GREEN" && styles.green,
              ]}
            />
          </View>
          <Text style={styles.car}>
            {scenario.vehicle === "MOVING" ? "🚗  ➜" : "🚗"}
          </Text>
          <Text style={styles.roadCaption}>SIMULATED ROAD SCENE</Text>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusCard}>
            <Text style={styles.label}>VEHICLE</Text>
            <Text style={styles.value}>{scenario.vehicle}</Text>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.label}>SIGNAL</Text>
            <Text style={styles.value}>{scenario.light}</Text>
          </View>
        </View>

        <Text style={styles.scenarioTitle}>{scenario.title}</Text>
        <Text style={styles.muted}>{scenario.description}</Text>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => decide(true)}
            style={[styles.button, styles.crossButton]}
          >
            <Text style={styles.buttonText}>Cross now</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => decide(false)}
            style={[styles.button, styles.waitButton]}
          >
            <Text style={styles.buttonText}>Wait</Text>
          </Pressable>
        </View>

        {feedback ? (
          <View style={styles.feedback}>
            <Text style={styles.feedbackTitle}>YOUR RESULT</Text>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={nextScenario}
          style={styles.nextButton}
        >
          <Text style={styles.nextText}>Try another scenario →</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>LEARN BEFORE YOU CROSS</Text>
        <Text style={styles.muted}>
          Score: {score} correct decisions
        </Text>
        <Text style={styles.disclaimer}>
          Prototype preview • Simulated traffic • Not a real-time traffic
          monitoring or AR tracking system.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#08111F" },
  content: { padding: 22, paddingTop: 48, maxWidth: 760, width: "100%", alignSelf: "center" },
  brand: { color: "#75E0B5", fontSize: 14, fontWeight: "800", letterSpacing: 3 },
  tagline: { color: "#A6B5C9", marginTop: 8, marginBottom: 28 },
  hero: { backgroundColor: "#111F32", borderRadius: 22, padding: 22, borderWidth: 1, borderColor: "#263B52" },
  eyebrow: { color: "#75E0B5", fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  heading: { color: "#FFFFFF", fontSize: 32, fontWeight: "800", marginTop: 12 },
  muted: { color: "#A6B5C9", lineHeight: 22, marginTop: 8 },
  road: { height: 220, backgroundColor: "#293648", borderRadius: 14, marginTop: 24, overflow: "hidden", justifyContent: "center" },
  roadLine: { position: "absolute", top: 0, bottom: 0, left: "48%", width: 3, backgroundColor: "#F5D875" },
  crossing: { position: "absolute", left: "28%", top: 25, bottom: 25, width: "27%", flexDirection: "row", justifyContent: "space-around", alignItems: "stretch" },
  stripe: { width: 7, backgroundColor: "#FFFFFF", opacity: 0.9 },
  trafficLight: { position: "absolute", top: 16, right: 22, backgroundColor: "#111827", padding: 8, borderRadius: 14, gap: 6 },
  bulb: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#465364" },
  red: { backgroundColor: "#FF4D5A" },
  green: { backgroundColor: "#43D89A" },
  car: { position: "absolute", bottom: 55, left: "9%", fontSize: 34 },
  roadCaption: { position: "absolute", bottom: 12, alignSelf: "center", color: "#FFFFFF", fontSize: 10, letterSpacing: 2 },
  statusRow: { flexDirection: "row", gap: 12, marginTop: 20 },
  statusCard: { flex: 1, backgroundColor: "#1B2B40", borderRadius: 12, padding: 14 },
  label: { color: "#A6B5C9", fontSize: 10, fontWeight: "700", letterSpacing: 1 },
  value: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginTop: 7 },
  scenarioTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginTop: 24 },
  actions: { flexDirection: "row", gap: 12, marginTop: 22 },
  button: { flex: 1, minHeight: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", padding: 10 },
  crossButton: { backgroundColor: "#B83D49" },
  waitButton: { backgroundColor: "#147D61" },
  buttonText: { color: "#FFFFFF", fontWeight: "800" },
  feedback: { backgroundColor: "#1B2B40", borderRadius: 12, padding: 16, marginTop: 18 },
  feedbackTitle: { color: "#75E0B5", fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  feedbackText: { color: "#FFFFFF", lineHeight: 23, marginTop: 8 },
  nextButton: { alignItems: "center", padding: 16, marginTop: 8 },
  nextText: { color: "#75E0B5", fontWeight: "700" },
  footer: { paddingVertical: 24, gap: 8 },
  footerTitle: { color: "#FFFFFF", fontWeight: "800", letterSpacing: 1 },
  disclaimer: { color: "#8494A9", fontSize: 11, lineHeight: 18, marginTop: 8 },
});
