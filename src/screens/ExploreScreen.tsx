import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useI18n } from '../i18n/I18nContext';
import heritage from '../data/heritage.json';

interface HeritageItem {
  id: string;
  title: { en: string; fr: string; ar: string };
  intro: { en: string; fr: string; ar: string };
  details: { en: string; fr: string; ar: string };
  category: 'tangible' | 'intangible' | 'unesco' | 'national';
  year?: number;
  image?: string;
}

const filters: HeritageItem['category'][] = ['tangible', 'intangible', 'unesco', 'national'];

const ExploreScreen: React.FC = () => {
  const { t, locale } = useI18n();
  const [active, setActive] = useState<string>('all');
  const items = heritage as unknown as HeritageItem[];

  const filtered = useMemo(() => {
    if (active === 'all') return items;
    return items.filter((i) => i.category === active);
  }, [active, items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.explore.title}</Text>
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filter, active==='all' && styles.filterActive]} onPress={() => setActive('all')}>
          <Text style={styles.filterText}>{t.explore.filters.all}</Text>
        </TouchableOpacity>
        {filters.map((f) => (
          <TouchableOpacity key={f} style={[styles.filter, active===f && styles.filterActive]} onPress={() => setActive(f)}>
            <Text style={styles.filterText}>{t.explore.filters[f]}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => {
          const src = { uri: 'https://images.unsplash.com/photo-1548783307-f63adcac5f22?q=80&w=1200&auto=format&fit=crop' } as const;
          return (
            <View style={styles.card}>
              <Image source={src} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title[locale]}</Text>
                <Text style={styles.cardIntro}>{item.intro[locale]}</Text>
                <Text style={styles.cardDetails}>{item.details[locale]}</Text>
                {item.year && <Text style={styles.cardMeta}>Year: {item.year}</Text>}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b', padding: 16, paddingTop: 48 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 },
  filter: { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16 },
  filterActive: { backgroundColor: '#d35400', borderColor: '#d35400' },
  filterText: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 12 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 4 },
  cardIntro: { color: 'rgba(255,255,255,0.9)', marginBottom: 6 },
  cardDetails: { color: 'rgba(255,255,255,0.8)', marginBottom: 6 },
  cardMeta: { color: '#d35400', fontWeight: '700' }
});

export default ExploreScreen;

