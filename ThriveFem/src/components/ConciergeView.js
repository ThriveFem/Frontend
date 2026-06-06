import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { ShieldCheck, User, ArrowRight } from 'lucide-react-native';

const FilterTab = ({ label, active, onPress }) => (
  <Pressable 
    onPress={onPress}
    style={[styles.tab, active && styles.activeTab]}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
  </Pressable>
);

export const ConciergeView = ({ experts }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Cosmetic Dermatologists', 'Stress Coaches', 'Sleep Experts'];

  const filteredExperts = filter === 'All' 
    ? experts 
    : experts.filter(e => e.category === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellness Concierge</Text>
      
      {/* Top Row Segment Capsule Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {categories.map(cat => (
          <FilterTab 
            key={cat} 
            label={cat} 
            active={filter === cat} 
            onPress={() => setFilter(cat)} 
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredExperts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <User color={COLORS.secondary} size={20} />
              </View>
              <View>
                <Text style={styles.expertName}>{item.name}</Text>
                <Text style={styles.expertRole}>{item.role} • {item.specialty}</Text>
              </View>
            </View>

            <Text style={styles.feeText}>{item.fee}</Text>

            {/* THE STRATEGIC VALUE BUTTON */}
            <Pressable style={styles.transferButton}>
              <ShieldCheck color={COLORS.background} size={14} />
              <Text style={styles.transferText}>
                Authorize Automated 7-Day Vitals Logging Transfer Before Session
              </Text>
            </Pressable>
            
            <Pressable style={styles.bookButton}>
              <Text style={styles.bookText}>Schedule Consultation</Text>
              <ArrowRight color={COLORS.text} size={16} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  tabBar: { flexDirection: 'row', marginBottom: 20, maxHeight: 40 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, backgroundColor: 'rgba(255,255,255,0.05)' },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { color: COLORS.text, opacity: 0.6, fontSize: 12, fontWeight: '600' },
  activeTabText: { opacity: 1, color: COLORS.background },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  expertName: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
  expertRole: { color: COLORS.secondary, fontSize: 12, opacity: 0.8 },
  feeText: { color: COLORS.text, fontSize: 14, fontWeight: '600', marginBottom: 15, opacity: 0.9 },
  transferButton: { backgroundColor: COLORS.secondary, flexDirection: 'row', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  transferText: { color: COLORS.background, fontSize: 10, fontWeight: 'bold', marginLeft: 8, flex: 1 },
  bookButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 15 },
  bookText: { color: COLORS.text, fontSize: 14, fontWeight: '600' }
});