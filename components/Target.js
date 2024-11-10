import React from 'react';
import { View, StyleSheet } from 'react-native';

const Target = () => (
  <View style={styles.target} />
);

const styles = StyleSheet.create({
  target: {
    width: 60,
    height: 20,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

export default Target;
