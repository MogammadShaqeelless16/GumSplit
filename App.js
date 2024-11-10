import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GameScreen from './components/GameScreen';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <View style={styles.container}>
      {gameStarted ? (
        <GameScreen onGameOver={() => setGameStarted(false)} />
      ) : (
        <View style={styles.menu}>
          <Text style={styles.title}>Gum Split</Text>
          <TouchableOpacity style={styles.button} onPress={() => setGameStarted(true)}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
