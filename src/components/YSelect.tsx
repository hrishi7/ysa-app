import React from 'react';
import { Select, SelectProps, SelectItem, IndexPath } from '@ui-kitten/components';
import { StyleSheet, ViewStyle } from 'react-native';

interface YSelectProps extends SelectProps {
  options: string[];
  style?: ViewStyle;
}

export const YSelect = ({ options, style, ...props }: YSelectProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]> (new IndexPath(0));

  const displayValue = Array.isArray(selectedIndex) 
    ? options[selectedIndex[0].row] // handling multiple selection roughly
    : options[selectedIndex.row];

  return (
    <Select
      {...props}
      style={[styles.select, style]}
      selectedIndex={selectedIndex}
      value={displayValue}
      onSelect={(index) => {
          setSelectedIndex(index);
          if (props.onSelect) props.onSelect(index);
      }}
      size='large'
    >
      {options.map((title, index) => (
        <SelectItem key={index} title={title} />
      ))}
    </Select>
  );
};

const styles = StyleSheet.create({
  select: {
    marginVertical: 4,
    borderRadius: 8,
  },
});
