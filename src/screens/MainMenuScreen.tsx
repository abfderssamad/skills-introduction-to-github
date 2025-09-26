import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useI18n } from '../i18n/I18nContext';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'MainMenu'>;

const MainMenuScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useI18n();
  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop' }} style={styles.bg}>
      <LinearGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]} style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>{t.menu.title}</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RiddleGame')}>
            <Text style={styles.cardText}>{t.menu.riddle}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.cardText}>{t.menu.explore}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Music')}>
            <Text style={styles.cardText}>{t.menu.music}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.cardText}>{t.menu.privacy}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 36, fontWeight: '800', textAlign: 'center', marginBottom: 24, textShadowColor: '#000', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  card: { width: '44%', backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  cardText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});

export default MainMenuScreen;

