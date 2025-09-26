import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, I18nManager, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useI18n } from '../i18n/I18nContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

const LanguageScreen: React.FC<Props> = ({ navigation }) => {
  const { t, setLocale, locale } = useI18n();

  const selectLang = (l: 'en' | 'fr' | 'ar') => {
    setLocale(l);
    const isRTL = l === 'ar';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop' }} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>{t.language.title}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, locale==='ar' && styles.active]} onPress={() => selectLang('ar')}>
            <Text style={styles.btnText}>{t.language.arabic}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, locale==='fr' && styles.active]} onPress={() => selectLang('fr')}>
            <Text style={styles.btnText}>{t.language.french}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, locale==='en' && styles.active]} onPress={() => selectLang('en')}>
            <Text style={styles.btnText}>{t.language.english}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.continue} onPress={() => navigation.replace('MainMenu')}>
          <Text style={styles.continueText}>{t.language.continue}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  btn: { backgroundColor: 'rgba(255,255,255,0.15)', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  active: { backgroundColor: 'rgba(211,84,0,0.8)', borderColor: '#d35400' },
  btnText: { color: '#fff', fontSize: 16 },
  continue: { backgroundColor: '#d35400', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16 },
  continueText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});

export default LanguageScreen;

