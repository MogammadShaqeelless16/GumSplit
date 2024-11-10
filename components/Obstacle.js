import React from 'react';
import { View, StyleSheet } from 'react-native';

const Obstacle = ({ x, y, type }) => {
  const obstacleStyles = [styles.obstacle];
  if (type === 'blue') {
    obstacleStyles.push(styles.blue);
  }

  return <View style={[...obstacleStyles, { left: x, top: y }]} />;
};

const styles = StyleSheet.create({
  obstacle: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,  // Random obstacle shape
    position: 'absolute',
  },
  blue: {
    backgroundColor: 'blue',  // Blue obstacle for growing the gumball
  },
});

export default Obstacle;
