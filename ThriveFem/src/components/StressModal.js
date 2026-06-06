import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { COLORS } from '../theme/colors';
import { STRINGS } from '../data/translations';
import { Wind, AlertCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const StressModal = ({ visible, onDismiss, language = 'en' }) => {
  const T = STRINGS[language] || STRINGS.en;

  if (visible) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          
          <View style={styles.guideBadge}>
            <Text style={styles.guideText}>{T.guideTitle}</Text>
          </View>

          <View style={styles.headerRow}>
            <AlertCircle color={COLORS.primary} size={28} />
            <Text style={styles.title}>{T.modalHeader}</Text>
          </View>

          <Text style={styles.body}>{T.modalBody}</Text>

          <View style={styles.iconCircle}>
            <Wind color={COLORS.primary} size={40} />
          </View>

          <Pressable style={styles.primaryButton} onPress={onDismiss}>
            <Text style={styles.buttonText}>{T.modalButton}</Text>
          </Pressable>

          <Pressable onPress={onDismiss} style={styles.bypassBtn}>
            <Text style={styles.bypassText}>{T.bypass}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 27, 58, 0.96)', justifyContent: 'center', alignItems: 'center', padding: 30 },
  card: { backgroundColor: '#0A2647', width: '100%', borderRadius: 28, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  guideBadge: { backgroundColor: 'rgba(255, 105, 180, 0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, marginBottom: 20 },
  guideText: { color: COLORS.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  title: { color: COLORS.text, fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  body: { color: COLORS.text, fontSize: 15, textAlign: 'center', lineHeight: 22, opacity: 0.9, marginBottom: 25 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 105, 180, 0.05)', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  primaryButton: { backgroundColor: COLORS.primary, width: '100%', paddingVertical: 18, borderRadius: 50, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: COLORS.background, fontWeight: '900', fontSize: 14 },
  bypassBtn: { marginTop: 10 },
  bypassText: { color: COLORS.text, opacity: 0.4, fontSize: 13, textDecorationLine: 'underline' }
});