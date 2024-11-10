import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Gumball = ({ x, y, split }) => {
  return (
    <Animated.View style={[styles.gumball, { left: x, top: y }]}>
      {split && <Text style={styles.splitText}>Split</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gumball: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 25,
    position: 'absolute',
  },
  splitText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Gumball;
