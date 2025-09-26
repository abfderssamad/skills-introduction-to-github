import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useI18n } from '../i18n/I18nContext';

const PrivacyPolicyScreen: React.FC = () => {
  const { t, locale } = useI18n();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.title}>{t.privacy.title}</Text>
      {locale === 'en' && (
        <Text style={styles.text}>
          VivaMaroc respects your privacy. We do not collect personal data. The app stores your language preference locally only. Audio and images are bundled or loaded from official public sources. If any third-party links are provided (e.g., UNESCO pages), their policies apply.
        </Text>
      )}
      {locale === 'fr' && (
        <Text style={styles.text}>
          VivaMaroc respecte votre vie privée. Nous ne collectons aucune donnée personnelle. L'application enregistre uniquement votre préférence de langue localement. L'audio et les images sont intégrés ou proviennent de sources publiques officielles. En cas de liens tiers (ex. pages UNESCO), leurs politiques s'appliquent.
        </Text>
      )}
      {locale === 'ar' && (
        <Text style={styles.text}>
          تحترم VivaMaroc خصوصيتك. لا نقوم بجمع أي بيانات شخصية. يحفظ التطبيق تفضيل اللغة لديك محليًا فقط. يتم تضمين الصوت والصور أو تحميلها من مصادر عامة رسمية. في حالة وجود روابط خارجية (مثل صفحات اليونسكو)، تنطبق سياساتهم.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b', padding: 16, paddingTop: 48 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  text: { color: 'rgba(255,255,255,0.9)', lineHeight: 22 }
});

export default PrivacyPolicyScreen;

