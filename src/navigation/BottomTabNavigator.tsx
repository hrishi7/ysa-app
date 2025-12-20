import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../redux/hooks';
import { UserRole } from '../types';
import { i18n } from '../i18n';

// Screens
import { HomeScreen } from '../screens/main/HomeScreen';
import { PaymentsScreen } from '../screens/main/PaymentsScreen';
import { AddPaymentScreen } from '../screens/main/AddPaymentScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { ApprovalsScreen } from '../screens/main/ApprovalsScreen';
import { StudentsScreen } from '../screens/main/StudentsScreen';
import { AdminsScreen } from '../screens/main/AdminsScreen';

// Components
import { CustomBottomBar } from '../components/CustomBottomBar';

const Tab = createBottomTabNavigator();

// Define tabs for each role
type TabConfig = {
  name: string;
  component: React.ComponentType<any>;
  icon: string;
  getLabel: () => string;
};

const SUPER_ADMIN_TABS: TabConfig[] = [
  { name: 'Approvals', component: ApprovalsScreen, icon: 'checkmark-circle-outline', getLabel: () => i18n.t('nav_approvals') },
  { name: 'Students', component: StudentsScreen, icon: 'people-outline', getLabel: () => i18n.t('nav_students') },
  { name: 'Admins', component: AdminsScreen, icon: 'shield-outline', getLabel: () => i18n.t('nav_admins') },
  { name: 'Payments', component: PaymentsScreen, icon: 'card-outline', getLabel: () => i18n.t('nav_payments') },
  { name: 'Profile', component: ProfileScreen, icon: 'person-outline', getLabel: () => i18n.t('nav_profile') },
];

const ADMIN_TABS: TabConfig[] = [
  { name: 'Students', component: StudentsScreen, icon: 'people-outline', getLabel: () => i18n.t('nav_students') },
  { name: 'Payments', component: PaymentsScreen, icon: 'card-outline', getLabel: () => i18n.t('nav_payments') },
  { name: 'Profile', component: ProfileScreen, icon: 'person-outline', getLabel: () => i18n.t('nav_profile') },
];

const RECEPTIONIST_TABS: TabConfig[] = [
  { name: 'Students', component: StudentsScreen, icon: 'people-outline', getLabel: () => i18n.t('nav_students') },
  { name: 'Payments', component: PaymentsScreen, icon: 'card-outline', getLabel: () => i18n.t('nav_payments') },
  { name: 'Profile', component: ProfileScreen, icon: 'person-outline', getLabel: () => i18n.t('nav_profile') },
];

const STUDENT_TABS: TabConfig[] = [
  { name: 'Payments', component: PaymentsScreen, icon: 'card-outline', getLabel: () => i18n.t('nav_payments') },
  { name: 'Profile', component: ProfileScreen, icon: 'person-outline', getLabel: () => i18n.t('nav_profile') },
];

const getTabsForRole = (role: UserRole | null): TabConfig[] => {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return SUPER_ADMIN_TABS;
    case UserRole.ADMIN:
      return ADMIN_TABS;
    case UserRole.RECEPTIONIST:
      return RECEPTIONIST_TABS;
    case UserRole.STUDENT:
    default:
      return STUDENT_TABS;
  }
};

export const BottomTabNavigator = () => {
  const userRole = useAppSelector((state) => state.auth.role);
  const baseTabs = getTabsForRole(userRole);
  
  // Transform tabs to include localized labels
  const tabs = baseTabs.map(tab => ({
    ...tab,
    label: tab.getLabel()
  }));

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomBar {...props} tabs={tabs} />}
      screenOptions={{ headerShown: false }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};
