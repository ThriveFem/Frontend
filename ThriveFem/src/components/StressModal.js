import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { COLORS } from '../theme/colors';
import { AlertTriangle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const StressModal = ({ visible, onDismiss }) => {
  // Trigger a haptic warning when the modal appears
  if (visible) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <AlertTriangle color={COLORS.primary} size={24} />
            <Text style={styles.title}>High Sympathetic Load Detected</Text>
          </View>

          <Text style={styles.body}>
            Sustained autonomic tension peaks identified across the previous 120 minutes. 
            Cellular reconstruction pathways and overnight skin barrier regeneration cycles 
            are currently {"\n"}<Text style={styles.highlight}>throttled.</Text>
          </Text>

          <Text style={styles.instruction}>
            Activate bio-adaptive breathing to suppress cortisol metrics.
          </Text>

          {/* Primary Interaction Capsule */}
          <Pressable style={styles.primaryButton} onPress={onDismiss}>
            <Text style={styles.buttonText}>[ Initiate 5-Min Bio-Adaptive Reset Loop ]</Text>
          </Pressable>

          {/* Explicit exit escape button */}
          <Pressable style={styles.linkButton} onPress={onDismiss}>
            <Text style={styles.linkText}>Bypass Notification</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 27, 58, 0.95)', // Dark background shading
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#0A2647',
    borderRadius: 24,
    padding: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary, // #FF69B4
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { color: COLORS.text, fontSize: 18, fontWeight: '800', marginLeft: 10 },
  body: { color: COLORS.text, fontSize: 15, lineHeight: 22, opacity: 0.9, marginBottom: 15 },
  highlight: { color: COLORS.primary, fontWeight: 'bold' },
  instruction: { color: COLORS.secondary, fontSize: 14, fontWeight: '600', marginBottom: 30 },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { color: COLORS.background, fontWeight: '800', fontSize: 13 },
  linkButton: { alignItems: 'center' },
  linkText: { color: COLORS.text, opacity: 0.5, fontSize: 12, textDecorationLine: 'underline' },
});