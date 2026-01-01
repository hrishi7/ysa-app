import React, { useState, useCallback, useEffect } from 'react';
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
import UserService from '../../services/UserService';
import { spacing, borderRadius } from '../../theme';


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

  const [students, setStudents] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FeeFilter>('all');
  const [filters] = useState(FEE_FILTERS);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await UserService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students', error);
      // Ideally show toast/alert
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
    fetchStudents();
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
