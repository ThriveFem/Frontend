import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const TelemetryCard = ({ label, value, subtext, icon: Icon }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Icon color={COLORS.primary} size={16} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.subtext} numberOfLines={2}>{subtext}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 18,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { color: COLORS.secondary, fontSize: 10, marginLeft: 6, fontWeight: '800', textTransform: 'uppercase' },
  value: { color: COLORS.text, fontSize: 20, fontWeight: 'bold' },
  subtext: { color: COLORS.text, fontSize: 10, opacity: 0.6, marginTop: 4, lineHeight: 14 },
});