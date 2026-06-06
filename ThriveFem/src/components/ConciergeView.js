import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView, Modal } from 'react-native';
import { COLORS } from '../theme/colors';
import { ShieldCheck, User, ArrowRight, CheckCircle2, X } from 'lucide-react-native';

const FilterTab = ({ label, active, onPress }) => (
  <Pressable onPress={onPress} style={[styles.tab, active && styles.activeTab]}>
    <Text numberOfLines={1} style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
  </Pressable>
);

export const ConciergeView = ({ experts }) => {
  const [filter, setFilter] = useState('All');
  const [bookedExpert, setBookedExpert] = useState(null); // Track which expert is being booked

  const categories = ['All', 'Cosmetic Dermatologists', 'Stress Coaches', 'Sleep Experts'];
  const filteredExperts = filter === 'All' ? experts : experts.filter(e => e.category === filter);

  const handleBooking = (expert) => {
    setBookedExpert(expert);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellness Concierge</Text>
      
      <View style={styles.tabBarWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBarContent}>
          {categories.map(cat => (
            <FilterTab key={cat} label={cat} active={filter === cat} onPress={() => setFilter(cat)} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredExperts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}><User color={COLORS.secondary} size={20} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.expertName}>{item.name}</Text>
                <Text style={styles.expertRole}>{item.role}</Text>
              </View>
            </View>

            <Text style={styles.feeText}>{item.fee}</Text>

            {/* Strategic Value: Data Continuity Flag */}
            <View style={styles.transferBadge}>
              <ShieldCheck color={COLORS.secondary} size={12} />
              <Text style={styles.transferText}>Vitals Transfer Authorized</Text>
            </View>
            
            <Pressable 
              style={styles.bookButton} 
              onPress={() => handleBooking(item)}
            >
              <Text style={styles.bookText}>Schedule Consultation</Text>
              <ArrowRight color={COLORS.text} size={16} />
            </Pressable>
          </View>
        )}
      />

      {/* SUCCESS CONFIRMATION MODAL (Professional Transactional Flow) */}
      <Modal visible={!!bookedExpert} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <CheckCircle2 color={COLORS.primary} size={60} style={{ marginBottom: 20 }} />
            <Text style={styles.successTitle}>Consultation Confirmed</Text>
            <Text style={styles.successBody}>
              Your session with <Text style={{fontWeight: 'bold'}}>{bookedExpert?.name}</Text> has been successfully scheduled.
            </Text>
            
            <View style={styles.dataSyncBox}>
              <ShieldCheck color={COLORS.primary} size={16} />
              <Text style={styles.dataSyncText}>
                Platform successfully pushed 7-day deep-tissue vitals log to professional dashboard.
              </Text>
            </View>

            <Pressable style={styles.closeButton} onPress={() => setBookedExpert(null)}>
              <Text style={styles.closeButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  tabBarWrapper: { marginBottom: 20 },
  tabBarContent: { paddingRight: 20 },
  tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, backgroundColor: 'rgba(255,255,255,0.05)', minWidth: 60, alignItems: 'center', justifyContent: 'center' },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { color: COLORS.text, opacity: 0.6, fontSize: 13, fontWeight: '700' },
  activeTabText: { opacity: 1, color: COLORS.background },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  expertName: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
  expertRole: { color: COLORS.secondary, fontSize: 12, opacity: 0.8 },
  feeText: { color: COLORS.text, fontSize: 14, fontWeight: '600', marginBottom: 15 },
  transferBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, opacity: 0.7 },
  transferText: { color: COLORS.secondary, fontSize: 10, fontWeight: 'bold', marginLeft: 6 },
  bookButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 15 },
  bookText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  
  // SUCCESS MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 27, 58, 0.95)', justifyContent: 'center', alignItems: 'center', padding: 30 },
  successCard: { backgroundColor: '#0A2647', width: '100%', borderRadius: 30, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  successTitle: { color: COLORS.text, fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  successBody: { color: COLORS.text, fontSize: 14, textAlign: 'center', opacity: 0.8, lineHeight: 20, marginBottom: 25 },
  dataSyncBox: { backgroundColor: 'rgba(255, 105, 180, 0.1)', padding: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center' },
  dataSyncText: { color: COLORS.primary, fontSize: 11, fontWeight: '700', marginLeft: 10, flex: 1 },
  closeButton: { backgroundColor: COLORS.primary, width: '100%', paddingVertical: 15, borderRadius: 50, alignItems: 'center', marginTop: 30 },
  closeButtonText: { color: COLORS.background, fontWeight: 'bold', fontSize: 16 }
});