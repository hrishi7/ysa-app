import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
} from 'react-native';
import { Text, Icon, Button, useTheme } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectNotifications,
  selectUnreadCount,
  selectIsDrawerOpen,
  setDrawerOpen,
  markAsRead,
  markAllAsRead,
} from '../redux/slices/notificationSlice';
import { AppNotification } from '../types';
import { spacing, borderRadius, shadows } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.85;

export const NotificationDrawer = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(selectNotifications);
  const unreadCount = useAppSelector(selectUnreadCount);
  const isOpen = useAppSelector(selectIsDrawerOpen);

  const handleClose = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleNotificationPress = (notification: AppNotification) => {
    dispatch(markAsRead(notification._id));
    // Handle navigation based on notification type
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'payment':
        return 'card-outline';
      case 'approval':
        return 'checkmark-circle-outline';
      case 'reminder':
        return 'notifications-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getNotificationColor = (type: AppNotification['type']) => {
    switch (type) {
      case 'payment':
        return theme['color-success-500'];
      case 'approval':
        return theme['color-info-500'];
      case 'reminder':
        return theme['color-warning-500'];
      default:
        return theme['color-primary-500'];
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: AppNotification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.read
            ? 'transparent'
            : `${theme['color-primary-500']}08`,
        },
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.notificationIcon,
          { backgroundColor: `${getNotificationColor(item.type)}20` },
        ]}
      >
        <Icon
          name={getNotificationIcon(item.type)}
          fill={getNotificationColor(item.type)}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <View style={styles.notificationContent}>
        <Text category="s2" style={{ fontWeight: item.read ? '400' : '600' }}>
          {item.title}
        </Text>
        <Text category="c1" appearance="hint" numberOfLines={2}>
          {item.body}
        </Text>
        <Text category="c2" appearance="hint" style={{ marginTop: spacing.xxs }}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
      {!item.read && (
        <View
          style={[
            styles.unreadDot,
            { backgroundColor: theme['color-primary-500'] },
          ]}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.drawer,
                {
                  backgroundColor: theme['background-basic-color-1'],
                  paddingTop: insets.top,
                },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Text category="h6" style={{ fontWeight: '700' }}>
                    Notifications
                  </Text>
                  {unreadCount > 0 && (
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: theme['color-primary-500'] },
                      ]}
                    >
                      <Text category="c2" style={{ color: '#FFFFFF', fontWeight: '600' }}>
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Icon
                    name="close"
                    fill={theme['text-hint-color']}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Mark All Read */}
              {unreadCount > 0 && (
                <TouchableOpacity
                  style={styles.markAllButton}
                  onPress={handleMarkAllRead}
                >
                  <Text category="c1" style={{ color: theme['color-primary-500'] }}>
                    Mark all as read
                  </Text>
                </TouchableOpacity>
              )}

              {/* Notifications List */}
              <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Icon
                      name="notifications-off-outline"
                      fill={theme['text-hint-color']}
                      style={{ width: 48, height: 48, marginBottom: spacing.md }}
                    />
                    <Text category="s1" appearance="hint">
                      No notifications yet
                    </Text>
                  </View>
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    ...shadows.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    minWidth: 22,
    alignItems: 'center',
  },
  closeButton: {
    padding: spacing.xs,
  },
  markAllButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing['3xl'],
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: spacing.sm,
    marginTop: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['4xl'],
  },
});
