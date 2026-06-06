import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { Activity, Moon } from 'lucide-react-native';

export const TelemetryCard = ({ label, value, subtext, icon: Icon }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Icon color={COLORS.primary} size={20} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.subtext}>{subtext}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    width: '48%', // Matrix layout
    borderWidth: 1,
    borderColor: 'rgba(249, 168, 212, 0.1)', // #F9A8D4 with low alpha
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { color: COLORS.secondary, fontSize: 11, marginLeft: 6, fontWeight: 'bold', textTransform: 'uppercase' },
  value: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  subtext: { color: COLORS.text, fontSize: 10, opacity: 0.5, marginTop: 4 },
});