import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const IoniconsPack = {
  name: 'eva', // Keeping name 'eva' allows us to reuse existing "name=" props without changing every file!
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

const IconProvider = (name: string | symbol) => ({
  toReactElement: (props: any) => IoniconsIcon({ name, ...props }),
});

function IoniconsIcon({ name, style, fill, ...props }: any) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style) || {};
  const size = props.height || height || 24;
  const color = fill || tintColor;

  return (
    <Ionicons
      name={name as any}
      size={size}
      color={color}
      style={iconStyle}
      {...props}
    />
  );
}
