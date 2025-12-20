import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, useTheme } from '@ui-kitten/components';
import { ApprovalRequest, ApprovalStatus, User } from '../types';
import { spacing, borderRadius, shadows } from '../theme';

interface ApprovalCardProps {
  approval: ApprovalRequest;
  onPress: () => void;
  onApprove: () => void;
  onDeny: () => void;
}

import { i18n } from '../i18n';

export const ApprovalCard = ({
  approval,
  onPress,
  onApprove,
  onDeny,
}: ApprovalCardProps) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (approval.status) {
      case ApprovalStatus.APPROVED:
        return theme['color-success-500'];
      case ApprovalStatus.REJECTED:
        return theme['color-danger-500'];
      default:
        return theme['color-warning-500'];
    }
  };

  const getStatusText = () => {
    switch (approval.status) {
      case ApprovalStatus.APPROVED:
        return 'Approved';
      case ApprovalStatus.REJECTED:
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return i18n.t('just_now');
    if (hours < 24) return `${hours}${i18n.t('ago_h')}`;
    if (days < 7) return `${days}${i18n.t('ago_d')}`;
    return date.toLocaleDateString(i18n.locale);
  };

  const requesterName =
    typeof approval.requestedBy === 'object'
      ? (approval.requestedBy as User).name
      : 'Unknown';

  const actionKey = `action_${approval.action.toLowerCase().replace(' ', '_')}`;
  const actionName = i18n.translations[i18n.locale][actionKey] ? i18n.t(actionKey) : approval.action;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme['background-basic-color-2'],
          borderColor: theme['border-basic-color-1'],
        },
        shadows.sm,
      ]}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text category="s1" style={{ fontWeight: '600' }}>
            {actionName}
          </Text>
          <Text category="c1" appearance="hint" style={{ marginTop: 2 }}>
            {approval.resourceType} • {formatDate(approval.createdAt)}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor()}20` },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor() },
            ]}
          />
          <Text
            category="c2"
            style={{ color: getStatusColor(), fontWeight: '600' }}
          >
            {getStatusText()}
          </Text>
        </View>
      </View>

      {/* Requester Info */}
      <View style={styles.requesterRow}>
        <Icon
          name="person-outline"
          fill={theme['text-hint-color']}
          style={styles.icon}
        />
        <Text category="c1" appearance="hint">
          {`${i18n.t('requested_by')} `}
          <Text category="c1" style={{ fontWeight: '600' }}>
            {requesterName}
          </Text>
        </Text>
      </View>

      {/* Actions (only for pending) */}
      {approval.status === ApprovalStatus.PENDING && (
        <View style={styles.actions}>
          <Button
            size="small"
            appearance="ghost"
            status="danger"
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation?.();
              onDeny();
            }}
          >
            {i18n.t('deny')}
          </Button>
          <Button
            size="small"
            status="success"
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation?.();
              onApprove();
            }}
          >
            {i18n.t('approve')}
          </Button>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xxs,
  },
  requesterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    borderRadius: borderRadius.lg,
  },
});
