import React from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../theme';

import { i18n } from '../../i18n';

export const AddPaymentScreen = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Layout style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text category="h5" style={{ fontWeight: '700' }}>
          {`${i18n.t('add')} ${i18n.t('nav_payments')}`}
        </Text>
        <Text category="s1" appearance="hint" style={{ marginTop: spacing.sm }}>
          Payment recording form will be implemented here
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
});
