import React, { useState, useCallback, useEffect } from 'react';
import {
  Layout,
  Text,
  Button,
  Icon,
  useTheme,
  Toggle,
} from '@ui-kitten/components';
import { NotificationBell } from '../../components/NotificationBell';
import { i18n } from '../../i18n';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterChip } from '../../components/FilterChip';
import { AdminCard } from '../../components/AdminCard';
import { BottomSheetModal } from '../../components/BottomSheetModal';
import { EmptyState } from '../../components/EmptyState';
import { YInput } from '../../components/YInput';
import { User, UserRole, PermissionActions } from '../../types';
import UserService from '../../services/UserService';
import { spacing, borderRadius } from '../../theme';

// Mock data for admins/staff

type AdminUser = User & { permissions: string[] };

type RoleFilter = 'all' | UserRole.ADMIN | UserRole.RECEPTIONIST;

const ROLE_FILTERS = [
  { label: 'all', getLabel: () => i18n.t('all') },
  { label: UserRole.ADMIN, getLabel: () => i18n.t('role_admin') },
  { label: UserRole.RECEPTIONIST, getLabel: () => i18n.t('role_receptionist') },
];

const ALL_PERMISSIONS = [
  { key: PermissionActions.STUDENT_CREATE, label: 'Create Students' },
  { key: PermissionActions.STUDENT_READ, label: 'View Students' },
  { key: PermissionActions.STUDENT_UPDATE, label: 'Update Students' },
  { key: PermissionActions.STUDENT_DELETE, label: 'Delete Students' },
  { key: PermissionActions.PAYMENT_RECORD, label: 'Record Payments' },
  { key: PermissionActions.PAYMENT_READ, label: 'View Payments' },
  { key: PermissionActions.PAYMENT_APPROVE, label: 'Approve Payments' },
];

export const AdminsScreen = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState<string[]>([]);
  const [filters] = useState(ROLE_FILTERS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const staff = await UserService.getStaff();
      // Cast to AdminUser[] assuming backend returns permissions for staff
      setAdmins(staff as AdminUser[]);
    } catch (error) {
      console.error('Failed to fetch staff', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Add form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<UserRole.ADMIN | UserRole.RECEPTIONIST>(UserRole.RECEPTIONIST);

  const filteredAdmins = admins.filter((admin) => {
    if (selectedRole === 'all') return true;
    return admin.role === selectedRole;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStaff();
  }, []);

  const handleAdminPress = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setEditedPermissions([...admin.permissions]);
    setEditModalVisible(true);
  };

  const handleTogglePermission = (permission: string) => {
    setEditedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSavePermissions = () => {
    if (selectedAdmin) {
      setAdmins((prev) =>
        prev.map((a) =>
          a._id === selectedAdmin._id
            ? { ...a, permissions: editedPermissions }
            : a
        )
      );
    }
    setEditModalVisible(false);
  };

  const handleAddAdmin = () => {
    // TODO: Implement actual API call to create admin
    const newAdmin = {
      _id: Date.now().toString(),
      email: newEmail,
      name: newName,
      role: newRole,
      phone: newPhone,
      permissions: [PermissionActions.STUDENT_READ, PermissionActions.PAYMENT_READ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as AdminUser;
    
    // Ideally we call UserService.createStaff(...) here
    setAdmins((prev) => [...prev, newAdmin]);
    setAddModalVisible(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const renderAdmin = ({ item }: { item: AdminUser }) => (
    <AdminCard admin={item} onPress={() => handleAdminPress(item)} />
  );

  return (
    <Layout style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text category="h5" style={{ fontWeight: '700' }}>
            {i18n.t('nav_admins')}
          </Text>
          <Text category="c1" appearance="hint">
            {admins.length} {`${i18n.t('staff_members')}`}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}>
          <Button
            size="small"
            accessoryLeft={(props: any) => <Icon {...props} name="add-outline" />}
            onPress={() => setAddModalVisible(true)}
            style={{ borderRadius: borderRadius.lg }}
          >
            {`${i18n.t('add')}`}
          </Button>
          <NotificationBell />
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={filters}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FilterChip
              label={item.getLabel()}
              selected={selectedRole === item.label}
              onPress={() => setSelectedRole(item.label as RoleFilter)}
            />
          )}
          keyExtractor={(item) => item.label}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
        />
      </View>

      {/* Admins List */}
      <FlatList
        data={filteredAdmins}
        renderItem={renderAdmin}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme['color-primary-500']}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="shield-outline"
            title="No staff found"
            message="Add admins or receptionists to manage your academy"
          />
        }
      />

      {/* Edit Permissions Modal */}
      <BottomSheetModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        title="Edit Permissions"
      >
        {selectedAdmin && (
          <View style={styles.modalContent}>
            <View style={styles.adminInfo}>
              <Text category="s1" style={{ fontWeight: '600' }}>
                {selectedAdmin.name}
              </Text>
              <View
                style={[
                  styles.roleBadge,
                  {
                    backgroundColor:
                      selectedAdmin.role === UserRole.ADMIN
                        ? `${theme['color-info-500']}20`
                        : `${theme['color-primary-500']}20`,
                  },
                ]}
              >
                <Text
                  category="c2"
                  style={{
                    color:
                      selectedAdmin.role === UserRole.ADMIN
                        ? theme['color-info-500']
                        : theme['color-primary-500'],
                    textTransform: 'capitalize',
                  }}
                >
                  {selectedAdmin.role}
                </Text>
              </View>
            </View>

            <Text category="s2" appearance="hint" style={{ marginTop: spacing.lg, marginBottom: spacing.md }}>
              Permissions
            </Text>

            {ALL_PERMISSIONS.map((perm) => (
              <View key={perm.key} style={styles.permissionRow}>
                <Text category="s1">{perm.label}</Text>
                <Toggle
                  checked={editedPermissions.includes(perm.key)}
                  onChange={() => handleTogglePermission(perm.key)}
                />
              </View>
            ))}

            <Button
              style={styles.saveButton}
              onPress={handleSavePermissions}
            >
              Save Permissions
            </Button>
          </View>
        )}
      </BottomSheetModal>

      {/* Add Admin Modal */}
      <BottomSheetModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        title="Add Staff Member"
      >
        <View style={styles.modalContent}>
          <YInput
            label="Full Name"
            placeholder="Enter full name"
            value={newName}
            onChangeText={setNewName}
            style={{ marginBottom: spacing.lg }}
          />

          <YInput
            label="Email"
            placeholder="Enter email address"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: spacing.lg }}
          />

          <YInput
            label="Phone"
            placeholder="Enter phone number"
            value={newPhone}
            onChangeText={setNewPhone}
            keyboardType="phone-pad"
            style={{ marginBottom: spacing.lg }}
          />

          <Text category="label" style={{ marginBottom: spacing.sm }}>
            Role
          </Text>
          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={[
                styles.roleOption,
                newRole === UserRole.RECEPTIONIST && {
                  backgroundColor: theme['color-primary-500'],
                },
              ]}
              onPress={() => setNewRole(UserRole.RECEPTIONIST)}
            >
              <Text
                category="s2"
                style={{
                  color: newRole === UserRole.RECEPTIONIST ? '#FFFFFF' : theme['text-basic-color'],
                }}
              >
                {`${i18n.t('role_receptionist')}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleOption,
                newRole === UserRole.ADMIN && {
                  backgroundColor: theme['color-info-500'],
                },
              ]}
              onPress={() => setNewRole(UserRole.ADMIN)}
            >
              <Text
                category="s2"
                style={{
                  color: newRole === UserRole.ADMIN ? '#FFFFFF' : theme['text-basic-color'],
                }}
              >
                {`${i18n.t('role_admin')}`}
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            style={styles.saveButton}
            onPress={handleAddAdmin}
            disabled={!newName || !newEmail}
          >
            {`${i18n.t('add_staff')}`}
          </Button>
        </View>
      </BottomSheetModal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  filterContainer: {
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  modalContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  saveButton: {
    marginTop: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  roleOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
