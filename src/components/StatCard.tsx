import React from 'react';
import { StyleSheet, View, ImageSourcePropType } from 'react-native';
import { Text, useTheme, Icon } from '@ui-kitten/components';

interface StatCardProps {
  title: string;
  value: string | number;
  iconName?: string;
  backgroundColor?: string;
  type?: 'primary' | 'dark' | 'light';
}

export const StatCard = ({ title, value, iconName, type = 'dark' }: StatCardProps) => {
  const theme = useTheme();

  const getBgColor = () => {
      switch(type) {
          case 'primary': return theme['color-primary-500'];
          case 'dark': return '#1A1A1A';
          case 'light': return '#E0E0E0'; // Fallback
          default: return '#1A1A1A';
      }
  };

  const getTextColor = () => {
      return type === 'primary' ? '#1A1A1A' : '#FFFFFF';
  };

  return (
    <View style={[styles.container, { backgroundColor: getBgColor() }]}>
      <Text category='c2' style={[styles.title, { color: getTextColor(), opacity: 0.7 }]}>{title}</Text>
      <View style={styles.content}>
        <Text category='h4' style={{ color: getTextColor() }}>{value}</Text>
        {iconName && (
             <Icon 
                name={iconName} 
                fill={getTextColor()} 
                style={styles.icon}
             />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%', // Approx half width
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
    height: 120,
    justifyContent: 'space-between'
  },
  title: {
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 10
  },
  content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
  },
  icon: {
      width: 24,
      height: 24
  }
});
