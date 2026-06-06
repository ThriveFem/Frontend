import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  StatusBar, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';

// Theme & Store
import { COLORS } from './src/theme/colors';
import { useSimulationStore } from './src/store/useSimulationStore';

// Components
import { StatusBanner } from './src/components/StatusBanner';
import { RadianceRing } from './src/components/RadianceRing';
import { TelemetryCard } from './src/components/TelemetryCard';
import { StressModal } from './src/components/StressModal';

// Icons
import { Activity, Zap, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function App() {
  // 1. Get Simulation State from Zustand
  const { activeData, advanceSimulation } = useSimulationStore();
  
  // 2. Local UI State
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  /**
   * BUG FIX / LOGIC: 
   * When the simulation state changes to 'triggered', show the modal.
   * We keep this in a useEffect so it reacts instantly to the 'Presenter Trigger'.
   */
  useEffect(() => {
    if (activeData.system_alert_triggered) {
      setIsAlertVisible(true);
    } else {
      setIsAlertVisible(false);
    }
  }, [activeData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* VIEW 1: TOP NAVIGATION / STATUS */}
      <StatusBanner />

      <View style={styles.mainWrapper}>
        
        {/* HEADER SECTION */}
        <View style={styles.headerContainer}>
          <Text style={styles.brandText}>ThriveFem</Text>
          <Text style={styles.viewTitle}>Your Inner Balance</Text>
          <View style={styles.nodeBadge}>
            <Text style={styles.nodeText}>
              NODE: {activeData.timestamp_node.replace('_', ' ')}
            </Text>
          </View>
        </View>

        {/* HERO ASSET: RADIANCE RING */}
        <View style={styles.heroSection}>
          <RadianceRing score={activeData.radiance_score_percentage} />
        </View>

        {/* TELEMETRY DATA MATRIX (Layout Containers) */}
        <View style={styles.matrixGrid}>
          <TelemetryCard 
            label="HRV Baseline"
            value={`${activeData.heart_rate_variability_rmssd} ms`}
            subtext={activeData.heart_rate_variability_rmssd < 40 ? "Sympathetic Tension" : "Homeostatic Balance"}
            icon={Zap}
          />
          <TelemetryCard 
            label="Resting HR"
            value={`${activeData.resting_heart_rate_bpm} BPM`}
            subtext="Deep Tissue Pulse"
            icon={Heart}
          />
        </View>

        {/* SUB-TEXT ANALYSIS */}
        <View style={styles.analysisBox}>
          <Activity size={16} color={COLORS.secondary} />
          <Text style={styles.analysisText}>
            Continuous PPG Telemetry Streaming...
          </Text>
        </View>

      </View>

      {/* VIEW 3: OVERLAY MODAL (Condition Bound) */}
      <StressModal 
        visible={isAlertVisible} 
        onDismiss={() => setIsAlertVisible(false)} 
      />

      {/* PRIORITY BETA: Secret Presenter Trigger (Invisible) */}
      <Pressable 
        onPress={advanceSimulation}
        style={styles.secretTrigger}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // #001B3A
  },
  mainWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  brandText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  viewTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  nodeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  nodeText: {
    color: COLORS.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  matrixGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  analysisBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingVertical: 12,
    borderRadius: 12,
  },
  analysisText: {
    color: COLORS.text,
    fontSize: 12,
    opacity: 0.4,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  // INVISIBLE TRIGGER FOR LIVE PITCH
  secretTrigger: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    backgroundColor: 'transparent', // Change to 'rgba(255,0,0,0.2)' for testing
    zIndex: 999,
  },
});