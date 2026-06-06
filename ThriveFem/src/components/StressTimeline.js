import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Polyline, Line, Circle } from 'react-native-svg';
import { COLORS } from '../theme/colors';
import { TREND_DATA } from '../data/graphData';

const { width } = Dimensions.get('window');
const GRAPH_WIDTH = width - 80;
const GRAPH_HEIGHT = 180;

export const StressTimeline = () => {
  // Simple mapping function to turn data points into SVG coordinates
  const getCoords = (value, isSleep) => {
    const x = (TREND_DATA.findIndex(d => (isSleep ? d.sleep : d.stress) === value) / (TREND_DATA.length - 1)) * GRAPH_WIDTH;
    const y = GRAPH_HEIGHT - (value / 100) * GRAPH_HEIGHT;
    return `${x},${y}`;
  };

  const stressPoints = TREND_DATA.map(d => getCoords(d.stress, false)).join(' ');
  const sleepPoints = TREND_DATA.map(d => getCoords(d.sleep, true)).join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stress & Sleep Timeline</Text>
      <Text style={styles.subtitle}>7-Day Analytical Window</Text>

      <View style={styles.chartWrapper}>
        <Svg height={GRAPH_HEIGHT + 40} width={GRAPH_WIDTH} style={styles.svg}>
          {/* Grid Lines */}
          {[0, 0.5, 1].map((p, i) => (
            <Line key={i} x1="0" y1={GRAPH_HEIGHT * p} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT * p} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}

          {/* Sleep Line: Dashed #F9A8D4 */}
          <Polyline points={sleepPoints} fill="none" stroke={COLORS.secondary} strokeWidth="3" strokeDasharray="6,6" />

          {/* Stress Line: Solid #FF69B4 */}
          <Polyline points={stressPoints} fill="none" stroke={COLORS.primary} strokeWidth="4" />
          
          {/* Intersection Indicator (Thursday) */}
          <Circle cx={(3 / 6) * GRAPH_WIDTH} cy={GRAPH_HEIGHT - (88 / 100) * GRAPH_HEIGHT} r="6" fill={COLORS.primary} />
        </Svg>

        <View style={styles.xAxis}>
          {TREND_DATA.map((d, i) => (
            <Text key={i} style={styles.xText}>{d.day}</Text>
          ))}
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.indicator, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.legendText}>Stress (Cortisol)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.indicator, { backgroundColor: COLORS.secondary, borderRadius: 0 }]} />
          <Text style={styles.legendText}>Repair (Delta-Wave)</Text>
        </View>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>⚠️ Thursday Critical Convergence</Text>
        <Text style={styles.insightBody}>
          Heavy daytime stress peak directly led to collapsed overnight restorative deep sleep. 
          Biological recovery was abbreviated by 52%.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: COLORS.secondary, fontSize: 14, opacity: 0.7, marginBottom: 20 },
  chartWrapper: { backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 20, padding: 20, alignItems: 'center' },
  svg: { marginTop: 10 },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', width: GRAPH_WIDTH, marginTop: 15 },
  xText: { color: COLORS.text, fontSize: 10, opacity: 0.4 },
  legend: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  indicator: { width: 15, height: 4, borderRadius: 2, marginRight: 8 },
  legendText: { color: COLORS.text, fontSize: 10, opacity: 0.6 },
  insightCard: { backgroundColor: 'rgba(255,105,180,0.1)', padding: 15, borderRadius: 15, marginTop: 25, borderWidth: 1, borderColor: 'rgba(255,105,180,0.2)' },
  insightTitle: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
  insightBody: { color: COLORS.text, fontSize: 12, opacity: 0.8, lineHeight: 18 }
});