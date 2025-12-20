import React, { useState } from 'react';
import { i18n } from '../../i18n';
import {
  Layout,
  Text,
  Button,
  Icon,
  Select,
  SelectItem,
  IndexPath,
  Spinner,
  useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YInput } from '../../components/YInput';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginSuccess, setLoading, setError } from '../../redux/slices/authSlice';
import { UserRole, User } from '../../types';
import { spacing, borderRadius } from '../../theme';

const ROLES = [
  { label: 'Student', value: UserRole.STUDENT },
  { label: 'Receptionist', value: UserRole.RECEPTIONIST },
  { label: 'Admin', value: UserRole.ADMIN },
  { label: 'Super Admin', value: UserRole.SUPER_ADMIN },
];

// Mock user for development
const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.STUDENT]: {
    _id: '1',
    email: 'student@ysa.com',
    name: 'John Student',
    role: UserRole.STUDENT,
    phone: '+91 9876543210',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    course: { name: 'Full Stack Development', duration: '6 months', startDate: '2024-01-01' },
    totalFees: 50000,
    feesPaid: 25000,
  },
  [UserRole.RECEPTIONIST]: {
    _id: '2',
    email: 'receptionist@ysa.com',
    name: 'Jane Receptionist',
    role: UserRole.RECEPTIONIST,
    phone: '+91 9876543211',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  [UserRole.ADMIN]: {
    _id: '3',
    email: 'admin@ysa.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    phone: '+91 9876543212',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  [UserRole.SUPER_ADMIN]: {
    _id: '4',
    email: 'superadmin@ysa.com',
    name: 'Super Admin',
    role: UserRole.SUPER_ADMIN,
    phone: '+91 9876543213',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const LoginScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<IndexPath>(new IndexPath(0));
  const [showPassword, setShowPassword] = useState(false);

  const selectedRole = ROLES[selectedRoleIndex.row];

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      dispatch(setError('Please enter email and password'));
      return;
    }

    dispatch(setLoading(true));

    // Simulate API call with mock data
    setTimeout(() => {
      const mockUser = MOCK_USERS[selectedRole.value];
      dispatch(
        loginSuccess({
          user: { ...mockUser, email },
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
        })
      );
      // Navigation is handled automatically by AppNavigator based on isAuthenticated state
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    dispatch(setLoading(true));

    // Simulate Google sign-in with mock data
    setTimeout(() => {
      const mockUser = MOCK_USERS[UserRole.STUDENT];
      dispatch(
        loginSuccess({
          user: mockUser,
          accessToken: 'mock_google_access_token',
          refreshToken: 'mock_google_refresh_token',
        })
      );
      // Navigation is handled automatically by AppNavigator based on isAuthenticated state
    }, 1000);
  };

  const GoogleIcon = (props: any) => (
    <Image
      source={{
        uri: 'https://www.google.com/favicon.ico',
      }}
      style={{ width: 20, height: 20 }}
    />
  );

  const EyeIcon = (props: any) => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Icon
        {...props}
        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
        fill={theme['text-hint-color']}
      />
    </TouchableOpacity>
  );

  return (
    <Layout style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo/Brand Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text category="h4" style={[styles.title, { color: theme['text-basic-color'] }]}>
              Your Success Academy
            </Text>
            <Text
              category="s1"
              style={{ color: theme['text-hint-color'], marginTop: spacing.xs }}
            >
              Sign in to continue
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Role Selector */}
            <View style={styles.inputWrapper}>
              <Text category="label" style={styles.label}>
                Login As
              </Text>
              <Select
                selectedIndex={selectedRoleIndex}
                onSelect={(index) => setSelectedRoleIndex(index as IndexPath)}
                value={selectedRole.label}
                style={styles.select}
                size="large"
                accessoryLeft={(props: any) => (
                  <Icon {...props} name="person-outline" fill={theme['text-hint-color']} />
                )}
              >
                {ROLES.map((role) => (
                  <SelectItem key={role.value} title={role.label} />
                ))}
              </Select>
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <YInput
                label={i18n.t('email')}
                placeholder={i18n.t('email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                accessoryLeft={(props: any) => (
                  <Icon {...props} name="mail-outline" fill={theme['text-hint-color']} />
                )}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <YInput
                label={i18n.t('password')}
                placeholder={i18n.t('password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                accessoryLeft={(props: any) => (
                  <Icon {...props} name="lock-closed-outline" fill={theme['text-hint-color']} />
                )}
                accessoryRight={EyeIcon}
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text
                category="s2"
                style={{ color: theme['color-primary-500'] }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Text status="danger" category="c1">
                  {error}
                </Text>
              </View>
            )}

            {/* Login Button */}
            <Button
              style={[styles.loginButton, { backgroundColor: theme['color-primary-500'] }]}
              onPress={handleLogin}
              disabled={isLoading}
              size="large"
              accessoryLeft={isLoading ? () => <Spinner size="small" status="control" /> : undefined}
            >
              {isLoading ? '' : i18n.t('login')}
            </Button>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: theme['border-basic-color-2'] }]} />
              <Text
                category="c1"
                style={{ marginHorizontal: spacing.md, color: theme['text-hint-color'] }}
              >
                Or continue with
              </Text>
              <View style={[styles.divider, { backgroundColor: theme['border-basic-color-2'] }]} />
            </View>

            {/* Google Sign In */}
            <Button
              style={styles.googleButton}
              appearance="outline"
              status="basic"
              size="large"
              accessoryLeft={GoogleIcon}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
            >
              Continue with Google
            </Button>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text category="s1" style={{ color: theme['text-hint-color'] }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text category="s1"
                  style={{ color: theme['color-primary-500'], fontWeight: '600' }}
                >
                  {i18n.t('signup')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: spacing['3xl'],
    marginBottom: spacing['3xl'],
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  select: {
    borderRadius: borderRadius.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  loginButton: {
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing.lg,
    borderWidth: 0,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  googleButton: {
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing['2xl'],
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
