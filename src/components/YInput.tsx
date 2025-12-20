import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputProps, useTheme } from '@ui-kitten/components';
import { borderRadius } from '../theme';

interface YInputProps extends InputProps {
  // Additional custom props can be added here
}

export const YInput = (props: YInputProps) => {
  const theme = useTheme();

  return (
    <Input
      {...props}
      style={[
        styles.input,
        {
          backgroundColor: theme['background-basic-color-2'],
          borderColor: theme['border-basic-color-1'],
        },
        props.style,
      ]}
      textStyle={[
        styles.inputText,
        { color: theme['text-basic-color'] },
      ]}
      size="large"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
  },
});
