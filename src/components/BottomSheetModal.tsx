import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, borderRadius } from '../theme';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheetModal = ({
  visible,
  onClose,
  title,
  children,
}: BottomSheetModalProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={[
                styles.container,
                {
                  backgroundColor: theme['background-basic-color-1'],
                  paddingBottom: insets.bottom + spacing.lg,
                },
              ]}
            >
              {/* Drag Indicator */}
              <View style={styles.dragIndicatorContainer}>
                <View
                  style={[
                    styles.dragIndicator,
                    { backgroundColor: theme['border-basic-color-2'] },
                  ]}
                />
              </View>

              {/* Header */}
              {title && (
                <View style={styles.header}>
                  <Text category="h6" style={{ fontWeight: '700' }}>
                    {title}
                  </Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Icon
                      name="close"
                      fill={theme['text-hint-color']}
                      style={styles.closeIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* Content */}
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
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
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    maxHeight: '85%',
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});
