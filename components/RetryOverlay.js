// RetryOverlay.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RetryOverlay = ({ onRetry, onExit }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.gameOverText}>Game Over</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton} onPress={onExit}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 20,
  },
  retryButton: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    marginBottom: 20,
  },
  exitButton: {
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RetryOverlay;
