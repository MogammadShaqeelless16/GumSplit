// MovementButtons.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MovementButtons = ({ onPressLeft, onPressRight, onReleaseLeft, onReleaseRight }) => {
  return (
    <>
      {/* Left Button */}
      <TouchableOpacity
        style={[styles.button, { left: 20 }]}
        onPressIn={() => onPressLeft(true)}  // Start moving left
        onPressOut={onReleaseLeft}          // Stop moving left
      >
        <Text style={styles.buttonText}>Left</Text>
      </TouchableOpacity>

      {/* Right Button */}
      <TouchableOpacity
        style={[styles.button, { right: 20 }]}
        onPressIn={() => onPressRight(true)} // Start moving right
        onPressOut={onReleaseRight}         // Stop moving right
      >
        <Text style={styles.buttonText}>Right</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    padding: 15,
    backgroundColor: '#ff69b4',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MovementButtons;
