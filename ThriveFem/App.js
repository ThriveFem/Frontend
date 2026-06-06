import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  StatusBar, 
  Dimensions,
  ScrollView 
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Theme, Data & Store ---
import { COLORS } from './src/theme/colors';
import { useSimulationStore } from './src/store/useSimulationStore';
import { EXPERTS } from './src/data/experts';

// --- Views & Components ---
import { StatusBanner } from './src/components/StatusBanner';
import { RadianceRing } from './src/components/RadianceRing';
import { TelemetryCard } from './src/components/TelemetryCard';
import { StressModal } from './src/components/StressModal';
import { ConciergeView } from './src/components/ConciergeView';
import { StressTimeline } from './src/components/StressTimeline';

// --- Icons ---
import { Zap, Moon, Activity, LayoutGrid, BarChart3, LineChart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

function MainApp() {
  const insets = useSafeAreaInsets();
  const { activeData, advanceSimulation } = useSimulationStore();
  
  // Navigation: Dashboard (View 1), Timeline (View 2), Concierge (View 4)
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // View 3 Overlay Trigger Logic (alertCondition == true)
  useEffect(() => {
    if (activeData?.system_alert_triggered) {
      setIsAlertVisible(true);
    } else {
      setIsAlertVisible(false);
    }
  }, [activeData]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.mainWrapper}>
        
        {currentView === 'dashboard' && (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }} // Prevents nav bar overlap
          >
            <StatusBanner />
            
            <View style={styles.headerContainer}>
              <Text style={styles.brandText}>ThriveFem — MVP</Text>
              <Text style={styles.viewTitle}>Your Inner Balance</Text>
              <View style={styles.nodeBadge}>
                <Text style={styles.nodeText}>
                  SIMULATION NODE: {activeData?.timestamp_node?.toUpperCase() || 'OFFLINE'}
                </Text>
              </View>
            </View>

            <View style={styles.heroSection}>
              <RadianceRing score={activeData?.radiance_score_percentage || 0} />
            </View>

            <View style={styles.matrixGrid}>
              {/* HRV CARD */}
              <TelemetryCard 
                label="HRV Baseline"
                value={`${activeData?.heart_rate_variability_rmssd || 0} ms`}
                subtext={activeData?.heart_rate_variability_rmssd < 40 
                  ? "— Sympathetic Tension Dominant" 
                  : "— Homeostatic Balance"}
                icon={Zap}
              />
              {/* SLEEP CARD */}
              <TelemetryCard 
                label="Deep Sleep Index"
                value={`${activeData?.sleep_session_data?.sleep_efficiency_score || 0}%`}
                subtext={`Repairing: ${activeData?.sleep_session_data?.deep_sleep_percentage || 0}% Delta Window`}
                icon={Moon}
              />
            </View>

            <View style={styles.analysisBox}>
              <Activity size={14} color={COLORS.secondary || '#4ade80'} />
              <Text style={styles.analysisText}>
                Automated Real-time Hardware Data Acquisition Stream...
              </Text>
            </View>
          </ScrollView>
        )}

        {currentView === 'timeline' && <StressTimeline />}
        {currentView === 'concierge' && <ConciergeView experts={EXPERTS} />}
      </View>

      {/* VIEW 3: FOCUS-LOCKING MODAL */}
      <StressModal 
        visible={isAlertVisible} 
        onDismiss={() => setIsAlertVisible(false)} 
      />

      {/* FOOTER NAVIGATION ZONE */}
      <View style={[styles.navBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <NavButton 
          icon={BarChart3} 
          label="Insights" 
          active={currentView === 'dashboard'} 
          onPress={() => setCurrentView('dashboard')} 
        />
        <NavButton 
          icon={LineChart} 
          label="Timeline" 
          active={currentView === 'timeline'} 
          onPress={() => setCurrentView('timeline')} 
        />
        <NavButton 
          icon={LayoutGrid} 
          label="Concierge" 
          active={currentView === 'concierge'} 
          onPress={() => setCurrentView('concierge')} 
        />
        
        {/* PRIORITY BETA: Secret invisible tapping area in layout footer zone */}
        <Pressable 
          onPress={advanceSimulation} 
          style={styles.secretTrigger} 
        />
      </View>
    </View>
  );
}

const NavButton = ({ icon: Icon, label, active, onPress }) => (
  <Pressable onPress={onPress} style={styles.navItem}>
    <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
      <Icon 
        color={active ? (COLORS.primary || '#ffffff') : '#8ba0b2'} 
        size={24} 
      />
    </View>
    <Text style={[styles.navText, active && styles.navTextActive]}>
      {label}
    </Text>
  </Pressable>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#020C17' },
  mainWrapper: { flex: 1, paddingHorizontal: 24 },
  headerContainer: { marginTop: 15, marginBottom: 20 },
  brandText: { color: COLORS.primary || '#ffffff', fontSize: 11, fontWeight: '900', letterSpacing: 2.5, textTransform: 'uppercase' },
  viewTitle: { color: COLORS.text || '#ffffff', fontSize: 34, fontWeight: 'bold', letterSpacing: -0.5, marginTop: 4 },
  nodeBadge: { backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginTop: 12 },
  nodeText: { color: COLORS.secondary || '#4ade80', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  heroSection: { alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  matrixGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  analysisBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.02)' },
  analysisText: { color: COLORS.text || '#ffffff', fontSize: 11, opacity: 0.6, marginLeft: 10, fontWeight: '500' },
  
  // --- NAV BAR REFINEMENTS ---
  navBar: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row', 
    backgroundColor: '#05192D', // Deep modern background
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.05)', 
    justifyContent: 'space-around', 
    alignItems: 'flex-start',
    paddingTop: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 20,
  },
  navItem: { 
    alignItems: 'center', 
    width: width / 3,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 16,
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)', // Subtle highlight pill for the active tab
  },
  navText: { 
    color: '#8ba0b2', // Higher contrast gray for inactive state (no longer using 0.3 opacity)
    fontSize: 10, 
    fontWeight: '700', 
    letterSpacing: 0.5 
  },
  navTextActive: { 
    color: COLORS.primary || '#ffffff', 
    fontWeight: '900' 
  },
  
  secretTrigger: { 
    position: 'absolute', 
    right: 0, 
    bottom: 0, 
    width: 60, 
    height: 80, 
    backgroundColor: 'transparent' 
  }
});