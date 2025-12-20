import React, { useState, useCallback } from 'react';
import {
  Layout,
  Text,
  Input,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import { NotificationBell } from '../../components/NotificationBell';
import { i18n } from '../../i18n';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterChip } from '../../components/FilterChip';
import { StudentCard } from '../../components/StudentCard';
import { BottomSheetModal } from '../../components/BottomSheetModal';
import { EmptyState } from '../../components/EmptyState';
import { User, UserRole, FeeFrequency } from '../../types';
import { spacing, borderRadius } from '../../theme';

// Mock data for students
const MOCK_STUDENTS: User[] = [
  {
    _id: '1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: UserRole.STUDENT,
    phone: '+91 9876543210',
    profileImage: 'https://i.pravatar.cc/150?u=1',
    course: { name: 'Full Stack Development', duration: '6 months', startDate: '2024-01-15' },
    totalFees: 50000,
    feesPaid: 30000,
    feeFrequency: FeeFrequency.MONTHLY,
    nextPaymentDue: '2024-02-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    email: 'jane.smith@email.com',
    name: 'Jane Smith',
    role: UserRole.STUDENT,
    phone: '+91 9876543211',
    profileImage: 'https://i.pravatar.cc/150?u=2',
    course: { name: 'UI/UX Design', duration: '4 months', startDate: '2024-02-01' },
    totalFees: 35000,
    feesPaid: 35000,
    feeFrequency: FeeFrequency.ONE_TIME,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    email: 'mike.johnson@email.com',
    name: 'Mike Johnson',
    role: UserRole.STUDENT,
    phone: '+91 9876543212',
    profileImage: 'https://i.pravatar.cc/150?u=3',
    course: { name: 'Data Science', duration: '8 months', startDate: '2023-11-01' },
    totalFees: 70000,
    feesPaid: 20000,
    feeFrequency: FeeFrequency.QUARTERLY,
    nextPaymentDue: '2024-02-01',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    email: 'sarah.wilson@email.com',
    name: 'Sarah Wilson',
    role: UserRole.STUDENT,
    phone: '+91 9876543213',
    course: { name: 'Web Development', duration: '3 months', startDate: '2024-01-20' },
    totalFees: 25000,
    feesPaid: 0,
    feeFrequency: FeeFrequency.MONTHLY,
    nextPaymentDue: '2024-01-30',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type FeeFilter = 'all' | 'paid' | 'pending' | 'overdue';

const FEE_FILTERS = [
  { label: 'all', getLabel: () => i18n.t('all') },
  { label: 'paid', getLabel: () => i18n.t('fee_paid') },
  { label: 'pending', getLabel: () => i18n.t('fee_pending') },
  { label: 'overdue', getLabel: () => i18n.t('fee_overdue') },
];

export const StudentsScreen = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [students] = useState<User[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FeeFilter>('all');
  const [filters] = useState(FEE_FILTERS);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredStudents = students.filter((student) => {
    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone?.includes(searchQuery);

    // Fee status filter
    let matchesFilter = true;
    if (selectedFilter === 'paid') {
      matchesFilter = (student.feesPaid || 0) >= (student.totalFees || 0);
    } else if (selectedFilter === 'pending') {
      matchesFilter = (student.feesPaid || 0) < (student.totalFees || 0);
    } else if (selectedFilter === 'overdue') {
      matchesFilter =
        student.nextPaymentDue !== undefined &&
        new Date(student.nextPaymentDue) < new Date();
    }

    return matchesSearch && matchesFilter;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleStudentPress = (student: User) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const renderStudent = ({ item }: { item: User }) => (
    <StudentCard student={item} onPress={() => handleStudentPress(item)} />
  );

  return (
    <Layout style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text category="h5" style={{ fontWeight: '700' }}>
            {i18n.t('students_title')}
          </Text>
          <Text category="c1" appearance="hint">
            {students.length} total
          </Text>
        </View>
        <NotificationBell />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder={i18n.t('students_search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessoryLeft={(props: any) => (
            <Icon {...props} name="search" fill={theme['text-hint-color']} />
          )}
          style={[
            styles.searchInput,
            { backgroundColor: theme['background-basic-color-2'] },
          ]}
          size="large"
        />
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
              selected={selectedFilter === item.label}
              onPress={() => setSelectedFilter(item.label as FeeFilter)}
            />
          )}
          keyExtractor={(item) => item.label}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
        />
      </View>

      {/* Students List */}
      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
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
            icon="people-outline"
            title={i18n.t('no_results')}
            message={searchQuery ? i18n.t('no_results') : i18n.t('no_data')}
          />
        }
      />

      {/* Student Detail Modal */}
      <BottomSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Student Details"
      >
        {selectedStudent && (
          <View style={styles.modalContent}>
            <View style={styles.detailRow}>
              <Text category="s2" appearance="hint">
                Name
              </Text>
              <Text category="s1" style={{ fontWeight: '600' }}>
                {selectedStudent.name}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text category="s2" appearance="hint">
                Email
              </Text>
              <Text category="s1">{selectedStudent.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text category="s2" appearance="hint">
                Phone
              </Text>
              <Text category="s1">{selectedStudent.phone || 'N/A'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text category="s2" appearance="hint">
                Course
              </Text>
              <Text category="s1">
                {selectedStudent.course?.name || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text category="s2" appearance="hint">
                Duration
              </Text>
              <Text category="s1">
                {selectedStudent.course?.duration || 'N/A'}
              </Text>
            </View>

            <View style={styles.feeSection}>
              <Text category="s1" style={{ fontWeight: '600', marginBottom: spacing.md }}>
                Fee Details
              </Text>
              
              <View style={styles.feeRow}>
                <Text category="c1" appearance="hint">
                  Total Fees
                </Text>
                <Text category="s1" style={{ fontWeight: '600' }}>
                  ₹{selectedStudent.totalFees?.toLocaleString() || 0}
                </Text>
              </View>

              <View style={styles.feeRow}>
                <Text category="c1" appearance="hint">
                  Paid
                </Text>
                <Text category="s1" status="success" style={{ fontWeight: '600' }}>
                  ₹{selectedStudent.feesPaid?.toLocaleString() || 0}
                </Text>
              </View>

              <View style={styles.feeRow}>
                <Text category="c1" appearance="hint">
                  Remaining
                </Text>
                <Text
                  category="s1"
                  status={(selectedStudent.totalFees || 0) - (selectedStudent.feesPaid || 0) > 0 ? 'danger' : 'success'}
                  style={{ fontWeight: '600' }}
                >
                  ₹{((selectedStudent.totalFees || 0) - (selectedStudent.feesPaid || 0)).toLocaleString()}
                </Text>
              </View>

              {selectedStudent.nextPaymentDue && (
                <View style={styles.feeRow}>
                  <Text category="c1" appearance="hint">
                    Next Due Date
                  </Text>
                  <Text category="s1">
                    {new Date(selectedStudent.nextPaymentDue).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchInput: {
    borderRadius: borderRadius.xl,
    borderWidth: 0,
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
  },
  detailRow: {
    marginBottom: spacing.lg,
  },
  feeSection: {
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});
