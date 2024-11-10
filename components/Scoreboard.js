// Scoreboard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Scoreboard = ({ score, highScore }) => {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>High Score: {highScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#333',
  },
});

export default Scoreboard;
