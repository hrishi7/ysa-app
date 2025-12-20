import React, { useState } from 'react';
import { Layout, Text, Button, Avatar, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CircleAvatar } from '../../components/CircleAvatar';
import { StatCard } from '../../components/StatCard';
import { LinearGradient } from 'expo-linear-gradient';

export const HomeScreen = () => {
  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='wifi' style={{ width: 24, height: 24, marginRight: 8 }} fill='#000'/>
                <Text category='s1'>Live virtual try-on</Text>
            </View>
        </View>

        {/* Avatars */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
            <CircleAvatar label='You' isAdd />
            <CircleAvatar label='@Sophia...' imageUrl='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            <CircleAvatar label='@LiamSh...' imageUrl='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
            <CircleAvatar label='@OliviaD...' imageUrl='https://i.pravatar.cc/150?u=a04258114e29026302d' />
            <CircleAvatar label='@Charlo...' imageUrl='https://i.pravatar.cc/150?u=a04258114e29026702d' />
        </ScrollView>

        <Text category='h5' style={styles.sectionTitle}>Your stats</Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
            <View style={styles.column}>
                 <StatCard 
                    title='OUTFITS' 
                    value='10' 
                    type='primary' 
                    iconName='shirt-outline'
                 />
                 <StatCard 
                    title='OUTFITS WITH EVENTS' 
                    value='4' 
                    type='dark'
                    iconName='calendar-outline'
                 />
            </View>
            <View style={styles.column}>
                {/* Simulated partial card for "Saved" */}
                <View style={[styles.savedCard, { backgroundColor: '#E0E0E0' }]}>
                    <Text category='c2' style={{ textTransform: 'uppercase' }}>SAVED OUTFITS</Text>
                    <Text category='h4'>12</Text>
                </View>
            </View>
        </View>

        {/* Daily Outfit Card */}
        <View style={styles.outfitCard}>
            <View style={styles.outfitInfo}>
                <Text category='h4' style={styles.outfitTitle}>Personalized{'\n'}daily outfit</Text>
                <View style={styles.weatherWidget}>
                    <Icon name='cloud-outline' fill='#1A1A1A' style={{width: 24, height: 24}} />
                    <Text category='h6'>16°c</Text>
                </View>
                <Button 
                    accessoryLeft={<Icon name='eye-outline' />} 
                    appearance='filled' 
                    status='basic'
                    style={styles.viewButton}
                />
            </View>
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
                style={styles.outfitImage}
            />
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
             <Text category='h6'>Last news</Text>
             <Text category='s1' appearance='hint'>See all</Text>
        </View>

      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50,
    backgroundColor: '#FFFFFF', // Assuming light mode base for this design
  },
  scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 100
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24
  },
  avatarList: {
      marginBottom: 32,
      maxHeight: 90
  },
  sectionTitle: {
      marginBottom: 16
  },
  statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24
  },
  column: {
      width: '48%',
  },
  savedCard: {
      width: '100%',
      height: 120,
      borderRadius: 24,
      padding: 16,
      justifyContent: 'space-between',
      // Simulating the cut-off look
      marginRight: -40 
  },
  outfitCard: {
      backgroundColor: '#F0F0F0',
      borderRadius: 32,
      height: 300,
      padding: 24,
      flexDirection: 'row',
      overflow: 'hidden',
      marginBottom: 24
  },
  outfitInfo: {
      flex: 1,
      justifyContent: 'space-between',
      zIndex: 1
  },
  outfitTitle: {
      lineHeight: 32
  },
  weatherWidget: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16
  },
  viewButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#1A1A1A',
      borderWidth: 0
  },
  outfitImage: {
      width: 200,
      height: 350,
      position: 'absolute',
      right: -30,
      bottom: -20,
      resizeMode: 'cover'
  }
});
