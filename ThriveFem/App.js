import React from 'react';
import { StyleSheet, View, Text, Pressable, StatusBar, SafeAreaView } from 'react-native';
import { COLORS } from './src/theme/colors';
import { useSimulationStore } from './src/store/useSimulationStore';
import { StatusBanner } from './src/components/StatusBanner';
import { RadianceRing } from './src/components/RadianceRing';
import { TelemetryCard } from './src/components/TelemetryCard';
import { Activity, Moon } from 'lucide-react-native';

export default function App() {
  const { activeData, advanceSimulation } = useSimulationStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StatusBanner />

      <View style={styles.content}>
        <View style={styles.headerGroup}>
          <Text style={styles.headerTitle}>Inner Balance</Text>
          <Text style={styles.headerSubtitle}>Simulation Node: {activeData.timestamp_node}</Text>
        </View>

        {/* HERO ASSET */}
        <RadianceRing score={activeData.radiance_score_percentage} />

        {/* TELEMETRY MATRIX */}
        <View style={styles.matrixContainer}>
          <TelemetryCard 
            label="HRV Baseline"
            value={`${activeData.heart_rate_variability_rmssd} ms`}
            subtext={activeData.heart_rate_variability_rmssd < 40 ? "Sympathetic Dominant" : "Homeostatic Balance"}
            icon={Activity}
          />
          <TelemetryCard 
            label="Resting HR"
            value={`${activeData.resting_heart_rate_bpm} BPM`}
            subtext="Real-time Node"
            icon={Activity}
          />
        </View>
      </View>

      {/* Secret Trigger for Demo Logic */}
      <Pressable style={styles.secretTrigger} onPress={advanceSimulation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20 },
  headerGroup: { marginTop: 10 },
  headerTitle: { color: COLORS.text, fontSize: 34, fontWeight: '800' },
  headerSubtitle: { color: COLORS.secondary, fontSize: 14, opacity: 0.7 },
  matrixContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  secretTrigger: { position: 'absolute', bottom: 0, right: 0, width: 80, height: 80 },
});