import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView, Modal } from 'react-native';
import { COLORS } from '../theme/colors';
import { STRINGS } from '../data/translations';
import { ShieldCheck, User, ArrowRight, CheckCircle2 } from 'lucide-react-native';

export const ConciergeView = ({ experts, language = 'en' }) => {
  const T = STRINGS[language] || STRINGS.en;
  
  // Professional Fix: Use the index to keep filtering stable across languages
  const [filterIndex, setFilterIndex] = useState(0); 
  const [bookedExpert, setBookedExpert] = useState(null);

  // Mapping indices to the English keys in experts.js
  const dataKeys = ['All', 'Cosmetic Dermatologists', 'Stress Coaches', 'Sleep Experts'];

  const filteredExperts = filterIndex === 0 
    ? experts 
    : experts.filter(e => e.category === dataKeys[filterIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{T.concierge}</Text>
      
      <View style={styles.tabBarWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBarContent}>
          {T.categories.map((cat, index) => (
            <Pressable 
              key={cat} 
              onPress={() => setFilterIndex(index)}
              style={[styles.tab, filterIndex === index && styles.activeTab]}
            >
              <Text style={[styles.tabText, filterIndex === index && styles.activeTabText]}>{cat}</Text>
            </Pressable>
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
                <Text style={styles.expertRole}>{language === 'en' ? item.role : 'የባለሙያ አማካሪ'}</Text>
              </View>
            </View>

            <Text style={styles.feeText}>{item.fee}</Text>

            <View style={styles.transferButton}>
              <ShieldCheck color={COLORS.background} size={14} />
              <Text style={styles.transferText}>{T.transfer}</Text>
            </View>
            
            <Pressable style={styles.bookButton} onPress={() => setBookedExpert(item)}>
              <Text style={styles.bookText}>{T.schedule}</Text>
              <ArrowRight color={COLORS.text} size={16} />
            </Pressable>
          </View>
        )}
      />

      <Modal visible={!!bookedExpert} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <CheckCircle2 color={COLORS.primary} size={60} style={{ marginBottom: 20 }} />
            <Text style={styles.successTitle}>{language === 'en' ? 'Confirmed' : 'ተረጋግጧል'}</Text>
            <Text style={styles.successBody}>
              {language === 'en' 
                ? `Session with ${bookedExpert?.name} is scheduled.`
                : `ከ ${bookedExpert?.name} ጋር ያለዎት ቆይታ ተይዟል።`}
            </Text>
            <Pressable style={styles.closeButton} onPress={() => setBookedExpert(null)}>
              <Text style={styles.closeButtonText}>{language === 'en' ? 'Done' : 'ተጠናቋል'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  tabBarWrapper: { marginBottom: 20 },
  tab: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 10, backgroundColor: 'rgba(255,255,255,0.05)', minWidth: 75, alignItems: 'center', justifyContent: 'center' },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { color: COLORS.text, opacity: 0.7, fontSize: 12, fontWeight: '700' },
  activeTabText: { opacity: 1, color: COLORS.background },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  expertName: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
  expertRole: { color: COLORS.secondary, fontSize: 11, fontWeight: '700' },
  feeText: { color: COLORS.text, fontSize: 14, fontWeight: '600', marginBottom: 15 },
  transferButton: { backgroundColor: COLORS.secondary, flexDirection: 'row', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  transferText: { color: COLORS.background, fontSize: 10, fontWeight: '900', marginLeft: 8, flex: 1, lineHeight: 14 },
  bookButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 15 },
  bookText: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 27, 58, 0.95)', justifyContent: 'center', alignItems: 'center', padding: 30 },
  successCard: { backgroundColor: '#0A2647', width: '100%', borderRadius: 30, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  successTitle: { color: COLORS.text, fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  successBody: { color: COLORS.text, fontSize: 14, textAlign: 'center', opacity: 0.8, marginBottom: 25 },
  closeButton: { backgroundColor: COLORS.primary, width: '100%', paddingVertical: 15, borderRadius: 50, alignItems: 'center' },
  closeButtonText: { color: COLORS.background, fontWeight: 'bold', fontSize: 16 }
});