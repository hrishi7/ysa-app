import React from 'react';
import { Layout, Text, Button, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, borderRadius } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme, setLocale, selectTheme, selectLocale } from '../../redux/slices/appSlice';

export const SettingsScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  const currentLocale = useAppSelector(selectLocale);

  return (
    <Layout style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Button
          appearance="ghost"
          status="basic"
          onPress={() => navigation.goBack()}
        >
          Back
        </Button>
        <Text category="h6" style={{ fontWeight: '700' }}>
          Settings
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.section,
            { backgroundColor: theme['background-basic-color-2'] },
          ]}
        >
          <Text category="s1" style={{ fontWeight: '600', marginBottom: spacing.md }}>
            Appearance
          </Text>
          <View style={styles.row}>
            <Text>Current Theme: {currentTheme}</Text>
            <Button size="small" onPress={() => dispatch(toggleTheme())}>
              Toggle Theme
            </Button>
          </View>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: theme['background-basic-color-2'] },
          ]}
        >
          <Text category="s1" style={{ fontWeight: '600', marginBottom: spacing.md }}>
            Language
          </Text>
          <View style={styles.row}>
            <Text>Current: {currentLocale === 'en' ? 'English' : 'हिंदी'}</Text>
            <Button
              size="small"
              onPress={() => dispatch(setLocale(currentLocale === 'en' ? 'hi' : 'en'))}
            >
              Switch
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
