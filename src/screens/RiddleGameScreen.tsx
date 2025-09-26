import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useI18n } from '../i18n/I18nContext';
import riddlesData from '../data/riddles.json';

interface RiddleItem {
  id: string;
  question: { en: string; fr: string; ar: string };
  answer: { en: string; fr: string; ar: string };
  image?: string;
}

const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

const RiddleGameScreen: React.FC = () => {
  const { t, locale } = useI18n();
  const items = riddlesData as unknown as RiddleItem[];
  const [index, setIndex] = useState(getRandomIndex(items.length));
  const [show, setShow] = useState(false);

  const item = useMemo(() => items[index], [index]);

  const next = () => {
    setShow(false);
    setIndex(getRandomIndex(items.length));
  };

  const imageSource = item.image
    ? { uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' }
    : { uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.riddle.title}</Text>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={styles.question}>{item.question[locale]}</Text>
      {show && <Text style={styles.answer}>{item.answer[locale]}</Text>}
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => setShow(s => !s)}>
          <Text style={styles.btnText}>{show ? t.riddle.hideAnswer : t.riddle.showAnswer}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.next]} onPress={next}>
          <Text style={styles.btnText}>{t.riddle.next}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b', padding: 16, paddingTop: 48 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 16, textAlign: 'center' },
  image: { width: '100%', height: 220, borderRadius: 16, marginBottom: 16 },
  question: { color: '#fff', fontSize: 18, marginBottom: 12 },
  answer: { color: '#d35400', fontSize: 18, marginBottom: 16, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  btn: { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  next: { backgroundColor: '#d35400', borderColor: '#d35400' }
});

export default RiddleGameScreen;

