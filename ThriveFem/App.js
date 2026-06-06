import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, Pressable, StatusBar, Dimensions, ScrollView 
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

// --- Theme, Data, Store & Translations ---
import { COLORS } from './src/theme/colors';
import { useSimulationStore } from './src/store/useSimulationStore';
import { EXPERTS } from './src/data/experts';
import { STRINGS } from './src/data/translations';

// --- Views & Components ---
import { StatusBanner } from './src/components/StatusBanner';
import { RadianceRing } from './src/components/RadianceRing';
import { TelemetryCard } from './src/components/TelemetryCard';
import { StressModal } from './src/components/StressModal';
import { ConciergeView } from './src/components/ConciergeView';
import { StressTimeline } from './src/components/StressTimeline';

// --- Icons ---
import { Zap, Moon, Activity, LayoutGrid, BarChart3, LineChart, Languages } from 'lucide-react-native';

const { width } = Dimensions.get('window');

function MainApp() {
  const insets = useSafeAreaInsets();
  const { activeData, advanceSimulation, language, toggleLanguage } = useSimulationStore();
  
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // Translation Helper (PDF Spec 2.1)
  const T = STRINGS[language] || STRINGS.en;

  // View 3 Overlay Trigger Logic (PDF Spec 2.3)
  useEffect(() => {
    if (activeData?.system_alert_triggered) {
      setIsAlertVisible(true);
    } else {
      setIsAlertVisible(false);
    }
  }, [activeData]);

  const handleLanguageChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleLanguage();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.mainWrapper}>
        
        {/* --- TOP HEADER (LOCALIZATION & STATUS) --- */}
        <View style={styles.topActionBar}>
          <StatusBanner />
          <Pressable 
            onPress={handleLanguageChange} 
            style={styles.languageToggle}
            hitSlop={20}
          >
            <Languages color={COLORS.primary} size={18} />
            <Text style={styles.languageLabel}>{T.langLabel}</Text>
          </Pressable>
        </View>

        {/* --- DYNAMIC VIEW ROUTING --- */}
        {currentView === 'dashboard' && (
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.brandText}>ThriveFem — LIFESTYLE GUIDE</Text>
              <Text style={styles.viewTitle}>{T.dashboard}</Text>
              <View style={styles.nodeBadge}>
                <Text style={styles.nodeText}>VITAL NODE: {activeData?.timestamp_node?.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.heroSection}>
              <RadianceRing score={activeData?.radiance_score_percentage || 0} />
            </View>

            <View style={styles.matrixGrid}>
              <TelemetryCard 
                label={T.hrv} 
                value={`${activeData?.heart_rate_variability_rmssd || 0} ms`} 
                subtext={activeData?.heart_rate_variability_rmssd < 40 ? "Stress Peak" : "Homeostatic"} 
                icon={Zap} 
              />
              <TelemetryCard 
                label={T.sleep} 
                value={`${activeData?.sleep_session_data?.sleep_efficiency_score || 0}%`} 
                subtext={`Repair: ${activeData?.sleep_session_data?.deep_sleep_percentage || 0}%`} 
                icon={Moon} 
              />
            </View>

            <View style={styles.analysisBox}>
              <Activity size={14} color={COLORS.secondary} />
              <Text style={styles.analysisText}>{T.streaming}</Text>
            </View>
          </ScrollView>
        )}

        {currentView === 'timeline' && <StressTimeline language={language} />}
        {currentView === 'concierge' && <ConciergeView experts={EXPERTS} language={language} />}
      </View>

      {/* --- REFINED STRESS ALERT (VIEW 3) --- */}
      <StressModal 
        visible={isAlertVisible} 
        onDismiss={() => setIsAlertVisible(false)} 
        language={language} 
      />

      {/* --- GLOBAL FOOTER NAVIGATION --- */}
      <View style={[styles.navBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <NavButton icon={BarChart3} label={T.insights} active={currentView === 'dashboard'} onPress={() => setCurrentView('dashboard')} />
        <NavButton icon={LineChart} label={T.timeline} active={currentView === 'timeline'} onPress={() => setCurrentView('timeline')} />
        <NavButton icon={LayoutGrid} label={T.concierge} active={currentView === 'concierge'} onPress={() => setCurrentView('concierge')} />
        
        {/* --- SECRET SIMULATION TRIGGER (SECTION 1) --- */}
        <Pressable onPress={advanceSimulation} style={styles.secretTrigger} />
      </View>
    </View>
  );
}

const NavButton = ({ icon: Icon, label, active, onPress }) => (
  <Pressable onPress={onPress} style={styles.navItem}>
    <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
      <Icon color={active ? COLORS.primary : '#8ba0b2'} size={24} />
    </View>
    <Text style={[styles.navText, active && styles.navTextActive]}>{label}</Text>
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
  topActionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  languageToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  languageLabel: { color: COLORS.text, fontSize: 12, fontWeight: 'bold', marginLeft: 8 },
  headerContainer: { marginBottom: 15 },
  brandText: { color: COLORS.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2 },
  viewTitle: { color: COLORS.text, fontSize: 32, fontWeight: 'bold', letterSpacing: -0.5 },
  nodeBadge: { backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginTop: 12 },
  nodeText: { color: COLORS.secondary, fontSize: 9, fontWeight: '900' },
  heroSection: { alignItems: 'center', justifyContent: 'center', marginVertical: 15 },
  matrixGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  analysisBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35, backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: 16, borderRadius: 12 },
  analysisText: { color: COLORS.text, fontSize: 10, opacity: 0.6, marginLeft: 10 },
  navBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#05192D', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  navItem: { alignItems: 'center', width: width / 3 },
  iconContainer: { padding: 8, borderRadius: 16, marginBottom: 4 },
  activeIconContainer: { backgroundColor: 'rgba(255,255,255,0.1)' },
  navText: { color: '#8ba0b2', fontSize: 10, fontWeight: '700' },
  navTextActive: { color: COLORS.primary, fontWeight: '900' },
  secretTrigger: { position: 'absolute', right: 0, bottom: 0, width: 60, height: 80 }
});