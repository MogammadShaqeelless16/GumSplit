import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import Obstacle from './Obstacle'; // Custom Obstacle component
import { loadHighScore, saveHighScore } from '../utils/storage'; // Helper functions for score saving/loading

export default function GameScreen({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rockHP, setRockHP] = useState(2);  // 2 HP for the rock
  const [rockSize, setRockSize] = useState(1);  // Full size (1)
  const [rockX, setRockX] = useState(150);  // Horizontal position of the rock
  const [obstacles, setObstacles] = useState([]); // Obstacles array
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);

  const screenHeight = useRef(0);

  useEffect(() => {
    const loadScore = async () => {
      const storedHighScore = await loadHighScore();
      setHighScore(storedHighScore || 0);
    };
    loadScore();
  }, []);

  // Handle rock and obstacle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => prev + 1);

      // Move obstacles upward
      setObstacles((prevObstacles) => {
        return prevObstacles
          .map((obstacle) => ({ ...obstacle, y: obstacle.y - 5 }))  // Move obstacles up
          .filter((obstacle) => obstacle.y > 0);  // Remove off-screen obstacles
      });

      // Spawn new obstacles at random horizontal positions
      if (Math.random() < 0.1) {  // 10% chance to spawn a new obstacle
        setObstacles((prev) => [
          ...prev,
          { id: Math.random(), x: Math.random() * 300, y: screenHeight.current },  // Random x, starting at the bottom
        ]);
      }

      // Handle rock movement based on button presses
      if (isMovingLeft && rockX > 0) {
        setRockX(rockX - 5);  // Move left
      }
      if (isMovingRight && rockX < 300) {
        setRockX(rockX + 5);  // Move right
      }

      // Check for collisions
      if (checkCollision()) {
        // Decrease HP and shrink rock size
        setRockHP((prevHP) => {
          const newHP = prevHP - 1;
          if (newHP <= 0) {
            setIsGameOver(true);
            if (score > highScore) {
              setHighScore(score);
              saveHighScore(score);
            }
          }
          return newHP;
        });
        setRockSize((prevSize) => (prevSize === 1 ? 0.5 : prevSize));  // Shrink the rock
      }
    }, 100);  // Update every 100ms

    return () => clearInterval(interval);
  }, [rockX, isMovingLeft, isMovingRight, score]);

  // Check for collision between rock and obstacles
  const checkCollision = () => {
    for (const obstacle of obstacles) {
      if (
        Math.abs(rockX - obstacle.x) < 30 &&  // Collision detection (X-axis)
        Math.abs(0 - obstacle.y) < 30  // Collision detection (Y-axis)
      ) {
        return true;
      }
    }
    return false;
  };

  // Retry the game
  const retryGame = () => {
    setIsGameOver(false);
    setScore(0);
    setRockHP(2);  // Reset rock HP
    setRockSize(1);  // Reset rock size
    setRockX(150);  // Reset rock position
    setObstacles([]);
  };

  return (
    <View style={styles.container} onLayout={(e) => { screenHeight.current = e.nativeEvent.layout.height; }}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>High Score: {highScore}</Text>
        <Text style={styles.scoreText}>Rock HP: {rockHP}</Text>
      </View>

      {/* Render obstacles */}
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} x={obstacle.x} y={obstacle.y} />
      ))}

      {/* Render Rock */}
      <Animated.View style={[styles.rock, { left: rockX, transform: [{ scale: rockSize }] }]}>
        <Image source={require('../assets/rock.png')} style={styles.rockImage} />
      </Animated.View>

      {/* Left Button */}
      <TouchableOpacity
        style={[styles.button, { left: 20 }]}
        onPressIn={() => setIsMovingLeft(true)}
        onPressOut={() => setIsMovingLeft(false)}
      >
        <Text style={styles.buttonText}>Left</Text>
      </TouchableOpacity>

      {/* Right Button */}
      <TouchableOpacity
        style={[styles.button, { right: 20 }]}
        onPressIn={() => setIsMovingRight(true)}
        onPressOut={() => setIsMovingRight(false)}
      >
        <Text style={styles.buttonText}>Right</Text>
      </TouchableOpacity>

      {/* Retry Button when Game Over */}
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retryGame}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#333',
  },
  rock: {
    position: 'absolute',
    top: 10,
  },
  rockImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  gameOverContainer: {
    position: 'absolute',
    top: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    color: 'red',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
});
