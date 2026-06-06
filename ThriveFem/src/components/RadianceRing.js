import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../theme/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const RadianceRing = ({ score }) => {
  const radius = 90;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  
  // Use standard Animated API (much more stable for Expo Go)
  const animatedValue = useRef(new Animated.Value(circumference)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: circumference - (circumference * score) / 100,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Circle props don't support native driver
    }).start();
  }, [score]);

  return (
    <View style={styles.container}>
      <Svg height="220" width="220" viewBox="0 0 220 220">
        <Circle
          cx="110" cy="110" r={radius}
          stroke="#102A43"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx="110" cy="110" r={radius}
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={animatedValue}
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 110 110)"
        />
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={styles.scoreText}>{score}%</Text>
        <Text style={styles.labelText}>RADIANCE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  labelContainer: { position: 'absolute', alignItems: 'center' },
  scoreText: { color: COLORS.text, fontSize: 48, fontWeight: '700' },
  labelText: { color: COLORS.secondary, fontSize: 12, letterSpacing: 4, fontWeight: '600' },
});