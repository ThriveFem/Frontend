import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const StatusBanner = () => (
  <View style={styles.container}>
    <View style={styles.dot} />
    <Text style={styles.text}>Wearable Simulator Online</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(74, 222, 128, 0.1)', // Subtle green glow
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 50, // Avoid notch
    marginRight: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80', // Status Green
    marginRight: 8,
  },
  text: {
    color: '#4ADE80',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});