import React, { useState } from 'react';
import { Layout, Text, Button, Select, SelectItem, IndexPath, Datepicker, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YInput } from '../../components/YInput';
import { PaymentMode } from '../../types';
import PaymentService from '../../services/PaymentService';
import { spacing } from '../../theme';
import { i18n } from '../../i18n';

export const AddPaymentScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [paymentModeIndex, setPaymentModeIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [isLoading, setIsLoading] = useState(false);

  const paymentModes = Object.values(PaymentMode);
  const selectedPaymentMode = paymentModes[(paymentModeIndex as IndexPath).row];

  const handleCreatePayment = async () => {
    if (!studentId || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await PaymentService.createPayment({
        studentId,
        amount: parseFloat(amount),
        paymentDate: date.toISOString(),
        paymentMode: selectedPaymentMode,
        notes,
      });
      Alert.alert('Success', 'Payment recorded successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
       console.error('Failed to create payment', error);
       Alert.alert('Error', 'Failed to create payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text category="h5" style={{ fontWeight: '700', marginBottom: spacing.xl }}>
          {`${i18n.t('add')} ${i18n.t('nav_payments')}`}
        </Text>
        
        <YInput
          label="Student ID (Email or ID)"
          placeholder="Enter student identifier"
          value={studentId}
          onChangeText={setStudentId}
          style={{ marginBottom: spacing.lg }}
        />

        <YInput
          label="Amount"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{ marginBottom: spacing.lg }}
        />

        <View style={{ marginBottom: spacing.lg }}>
          <Text category="label" style={{ marginBottom: spacing.xs }}>Payment Mode</Text>
          <Select
            selectedIndex={paymentModeIndex}
            onSelect={setPaymentModeIndex}
            value={selectedPaymentMode.toUpperCase()}
          >
            {paymentModes.map((mode) => (
              <SelectItem key={mode} title={mode.toUpperCase()} />
            ))}
          </Select>
        </View>

        <View style={{ marginBottom: spacing.lg }}>
           <Text category="label" style={{ marginBottom: spacing.xs }}>Date</Text>
           <Datepicker
             date={date}
             onSelect={setDate}
           />
        </View>

        <YInput
          label="Notes"
          placeholder="Optional notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={{ marginBottom: spacing.xl }}
        />

        <Button 
          onPress={handleCreatePayment} 
          disabled={isLoading}
        >
          {isLoading ? 'Recording...' : 'Record Payment'}
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
});
