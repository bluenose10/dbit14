import React from 'react';
import { View, StyleSheet } from 'react-native';

export const DiagonalDesign = () => {
  return (
    <View style={styles.container}>
      {/* First Diagonal Blue Section */}
      <View style={styles.blueSection}></View>

      {/* Second Diagonal Blue Section */}
      <View style={styles.blueSection2}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end', // Align the diagonal sections to the bottom
  },
  blueSection: {
    position: 'absolute',
    width: '200%', // Extra wide to cover the screen when rotated
    height: '20%', // Height for the first section
    backgroundColor: '#0a2261ff',
    transform: [{ rotate: '-20deg' }], // Diagonal effect
    top: '20%', // Adjust to move it down
    left: '-50%', // Move it left for the rotation
  },
  blueSection2: {
    position: 'absolute',
    width: '200%', // Extra wide to cover the screen when rotated
    height: '90%', // Height for the second section
    backgroundColor: '#0a2261ff',
    transform: [{ rotate: '-20deg' }], // Same diagonal effect
    top: '50%', // Adjust to move it down
    left: '-50%', // Move it left for the rotation
  },
});
