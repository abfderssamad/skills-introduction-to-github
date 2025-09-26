import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useI18n } from '../i18n/I18nContext';
import tracks from '../data/music.json';

interface TrackItem { id: string; title: string; artist: string; uri?: string }

const MusicScreen: React.FC = () => {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const list = tracks as unknown as TrackItem[];

  async function unload() {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }

  async function loadAndPlay(idx: number) {
    await unload();
    const source = { uri: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_4a3a82f5a1.mp3?filename=sahara-desert-10373.mp3' };
    const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: true }, (status) => {
      if (status.isLoaded && status.didJustFinish) {
        next();
      }
    });
    soundRef.current = sound;
    setPlaying(true);
  }

  function next() {
    const nextIndex = (index + 1) % list.length;
    setIndex(nextIndex);
    loadAndPlay(nextIndex);
  }

  async function togglePlay() {
    if (!soundRef.current) {
      await loadAndPlay(index);
      return;
    }
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setPlaying(true);
    }
  }

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });
    return () => { unload(); };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.music.title}</Text>
      <Text style={styles.subtitle}>{list[index]?.title} — {list[index]?.artist}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={togglePlay}>
          <Text style={styles.btnText}>{playing ? t.music.pause : t.music.play}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.next]} onPress={next}>
          <Text style={styles.btnText}>{t.music.next}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b', padding: 16, paddingTop: 48 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  btn: { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  next: { backgroundColor: '#d35400', borderColor: '#d35400' }
});

export default MusicScreen;

