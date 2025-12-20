import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Icon, Popover, useTheme, Text } from '@ui-kitten/components';
import { useAppSelector } from '../redux/hooks';
import { selectUnreadCount } from '../redux/slices/notificationSlice';
import { NotificationList } from './NotificationList';
import { spacing, shadows, borderRadius } from '../theme';

interface NotificationBellProps {
  style?: StyleProp<ViewStyle>;
}

export const NotificationBell = ({ style }: NotificationBellProps) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const unreadCount = useAppSelector(selectUnreadCount);

  const renderAnchor = () => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => setVisible(true)}
      activeOpacity={0.7}
    >
      <Icon
        name={visible ? 'notifications' : 'notifications-outline'}
        fill={theme['text-basic-color']}
        style={{ width: 24, height: 24 }}
      />
      {unreadCount > 0 && (
        <View style={[styles.badge, { backgroundColor: theme['color-danger-500'] }]}>
          <Text category="c2" style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderAnchor}
      onBackdropPress={() => setVisible(false)}
      style={[styles.popover, { backgroundColor: theme['background-basic-color-1'] }, shadows.md]}
    >
      <NotificationList onItemPress={() => setVisible(false)} />
    </Popover>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.xs,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 2,
    borderColor: 'white', // Should match header bg
  },
  popover: {
    borderRadius: borderRadius.lg,
    borderWidth: 0,
    padding: 0,
    marginTop: spacing.xs,
  },
});
