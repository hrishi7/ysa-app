import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';
import { spacing } from '../theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  message?: string;
}

export const EmptyState = ({ icon, title, message }: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme['background-basic-color-3'] },
        ]}
      >
        <Icon
          name={icon}
          fill={theme['text-hint-color']}
          style={styles.icon}
        />
      </View>
      <Text
        category="h6"
        style={[styles.title, { color: theme['text-basic-color'] }]}
      >
        {title}
      </Text>
      {message && (
        <Text
          category="s1"
          appearance="hint"
          style={styles.message}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['4xl'],
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    textAlign: 'center',
    maxWidth: 250,
  },
});
