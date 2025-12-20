import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

interface CircleAvatarProps {
  imageUrl?: string;
  isAdd?: boolean;
  label: string;
}

export const CircleAvatar = ({ imageUrl, isAdd, label }: CircleAvatarProps) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
        <TouchableOpacity style={[
            styles.container, 
            { borderColor: isAdd ? 'transparent' : theme['color-primary-500'] }
        ]}>
            {isAdd ? (
                <View style={[styles.placeholder, { backgroundColor: '#FFFFFF' }]}>
                    <Text category='h5' style={{ color: '#000' }}>+</Text>
                </View>
            ) : (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
        </TouchableOpacity>
        <Text category='c1' appearance='hint' style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
      alignItems: 'center',
      marginRight: 16,
  },
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    padding: 2, // Gap
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
      width: '100%',
      height: '100%',
      borderRadius: 30,
  },
  placeholder: {
      width: '100%',
      height: '100%',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },
  label: {
      marginTop: 4,
      fontSize: 10
  }
});
