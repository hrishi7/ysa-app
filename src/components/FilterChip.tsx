import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';
import { borderRadius, spacing } from '../theme';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string | ((props: any) => React.ReactElement);
  count?: number;
}

export const FilterChip = ({
  label,
  selected,
  onPress,
  icon,
  count,
}: FilterChipProps) => {
  const theme = useTheme();

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <Icon
          name={icon}
          style={styles.icon}
          fill={selected ? '#FFFFFF' : theme['text-basic-color']}
        />
      );
    }

    // icon is a function component
    return icon({
      width: 16,
      height: 16,
      fill: selected ? '#FFFFFF' : theme['text-basic-color'],
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? theme['color-primary-500']
            : theme['background-basic-color-2'],
          borderColor: selected
            ? theme['color-primary-500']
            : theme['border-basic-color-2'],
        },
      ]}
      activeOpacity={0.7}
    >
      {renderIcon()}
      <Text
        category="s2"
        style={[
          styles.label,
          {
            color: selected ? '#FFFFFF' : theme['text-basic-color'],
          },
        ]}
      >
        {label}
      </Text>
      {count !== undefined && count > 0 && (
        <View
          style={[
            styles.countBadge,
            {
              backgroundColor: selected
                ? 'rgba(255,255,255,0.3)'
                : theme['color-primary-500'],
            },
          ]}
        >
          <Text
            category="c2"
            style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 10 }}
          >
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: spacing.xs,
  },
  label: {
    fontWeight: '500',
  },
  countBadge: {
    marginLeft: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
    minWidth: 18,
    alignItems: 'center',
  },
});
