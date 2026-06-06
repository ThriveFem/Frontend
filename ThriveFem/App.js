import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  StatusBar, 
  SafeAreaView, 
  Dimensions,
  ScrollView
} from 'react-native';

// --- Theme & Simulation Store ---
import { COLORS } from './src/theme/colors';
import { useSimulationStore } from './src/store/useSimulationStore';
import { EXPERTS } from './src/data/experts'; // Ensure this file exists in src/data/experts.js

// --- Custom Components ---
import { StatusBanner } from './src/components/StatusBanner';
import { RadianceRing } from './src/components/RadianceRing';
import { TelemetryCard } from './src/components/TelemetryCard';
import { StressModal } from './src/components/StressModal';
import { ConciergeView } from './src/components/ConciergeView';

// --- Icons (Lucide) ---
import { 
  Zap, 
  Heart, 
  Activity, 
  LayoutGrid, 
  BarChart3 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function App() {
  // 1. Simulation State
  const { activeData, advanceSimulation } = useSimulationStore();
  
  // 2. Navigation & Modal State
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'concierge'
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // 3. Logic: Automatically trigger Modal based on Simulation Node
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
      
      {/* --- Main Content Area --- */}
      <View style={styles.mainWrapper}>
        
        {currentView === 'dashboard' ? (
          /* VIEW 1: INNER BALANCE DASHBOARD */
          <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBanner />
            
            <View style={styles.headerContainer}>
              <Text style={styles.brandText}>ThriveFem</Text>
              <Text style={styles.viewTitle}>Your Inner Balance</Text>
              <View style={styles.nodeBadge}>
                <Text style={styles.nodeText}>
                  NODE: {activeData.timestamp_node.replace('_', ' ')}
                </Text>
              </View>
            </View>

            <View style={styles.heroSection}>
              <RadianceRing score={activeData.radiance_score_percentage} />
            </View>

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
                subtext="Node Telemetry"
                icon={Heart}
              />
            </View>

            <View style={styles.analysisBox}>
              <Activity size={16} color={COLORS.secondary} />
              <Text style={styles.analysisText}>
                Continuous PPG Telemetry Streaming...
              </Text>
            </View>
          </ScrollView>
        ) : (
          /* VIEW 4: WELLNESS CONCIERGE MARKETPLACE */
          <ConciergeView experts={EXPERTS} />
        )}

      </View>

      {/* --- VIEW 3: STRESS ALERT MODAL (Global Layer) --- */}
      <StressModal 
        visible={isAlertVisible} 
        onDismiss={() => setIsAlertVisible(false)} 
      />

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <View style={styles.navBar}>
        <Pressable 
          onPress={() => setCurrentView('dashboard')} 
          style={styles.navItem}
        >
          <BarChart3 
            color={currentView === 'dashboard' ? COLORS.primary : COLORS.text} 
            size={24} 
            opacity={currentView === 'dashboard' ? 1 : 0.4}
          />
          <Text style={[
            styles.navText, 
            currentView === 'dashboard' && styles.navTextActive
          ]}>Insights</Text>
        </Pressable>

        <Pressable 
          onPress={() => setCurrentView('concierge')} 
          style={styles.navItem}
        >
          <LayoutGrid 
            color={currentView === 'concierge' ? COLORS.primary : COLORS.text} 
            size={24} 
            opacity={currentView === 'concierge' ? 1 : 0.4}
          />
          <Text style={[
            styles.navText, 
            currentView === 'concierge' && styles.navTextActive
          ]}>Concierge</Text>
        </Pressable>
      </View>

      {/* --- SECRET PRESENTER TRIGGER (Priority Beta Task) --- */}
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
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 10,
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
    marginTop: 40,
    marginBottom: 40,
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
  // --- Navigation Styles ---
  navBar: {
    flexDirection: 'row',
    height: 85,
    backgroundColor: '#05192D',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // Padding for safe area / home bar
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
  },
  navText: {
    color: COLORS.text,
    fontSize: 10,
    marginTop: 6,
    fontWeight: '700',
    opacity: 0.4,
  },
  navTextActive: {
    color: COLORS.primary,
    opacity: 1,
  },
  // --- Invisible Demo Trigger ---
  secretTrigger: {
    position: 'absolute',
    bottom: 85,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
});