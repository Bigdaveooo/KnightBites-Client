// This is the about page, accessed from the bottom button that says "About"
// This is a simple page that explains some of the goals of the app (from the vision statement), has a small tutorial, and credits the authors.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '@/constants/Styles';

export default function DetailsPage() {
  return (
    <View style={styles.aboutPageContainer}>
      <View style={{ height: 16 }} />
      <View style={{ backgroundColor: 'maroon', padding: 10, position: 'absolute', top: 0, left: 0, right: 0, height: 60, justifyContent: 'center' }}>
      </View>
      {/* 'absolute' position includes the top part of the iOS screen that includes the time. */}
      <View style={{ backgroundColor: 'maroon', padding: 10, position: 'sticky', top: 0, left: 0, right: 0, height: 60, justifyContent: 'center' }}>
        <Text style={{ color: 'gold', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>KnightBites</Text>
      </View>
      {/* 'sticky' position sets the banner for the rest of the page. Needs both 'absolute' and 'sticky' to look nice. */}

      <View style={styles.aboutPageSection}>
        <Text style={{ textAlign: 'center' }}> {/* All text on the page is centered. */}
          <Text style={{ fontWeight: 'bold' }}>
            {'\n'}Welcome to KnightBites!{'\n'}
          </Text>
          We want this app to serve as a forum for Calvin students to rank and review the food served at the dining halls on campus.
          {'\n\n'}
          Our goal is to provide a platform for students to share their opinions and experiences with the Calvin community.
          {'\n\n'}
          Our hope is that this app will help students make informed decisions about where to eat on campus.
          {'\n\n'}

          <Text style={{ fontWeight: 'bold' }}>
            {'\n'}How to use KnightBites:
          </Text>
          {'\n'}
          1. Click on the "Home" tab to view the dishes available. You can also filter by dining hall.
          {'\n\n'}
          2. Click on a dish to view more information about it.
          {'\n\n'}
          3. Write a review and rate the dish a rating 1-5 stars.
          {'\n\n'}
          Enjoy! (This text can be updated as needed.)
        </Text>


      </View>
      <View style={{ backgroundColor: 'maroon', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Developed by the KnightBites Team:{'\n'}
          Kenny Howes, Lily McAboy
          {'\n'}
          Jacob Tocila, Peter Lund
          {'\n'}
          David Barry, Lujia Li
        </Text>
      </View>
    </View> //End of container
  );
}
