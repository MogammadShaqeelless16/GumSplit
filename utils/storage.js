import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveHighScore = async (score) => {
  try {
    await AsyncStorage.setItem('highScore', JSON.stringify(score));
  } catch (error) {
    console.error('Failed to save high score:', error);
  }
};

export const loadHighScore = async () => {
  try {
    const score = await AsyncStorage.getItem('highScore');
    return score ? JSON.parse(score) : 0;
  } catch (error) {
    console.error('Failed to load high score:', error);
    return 0;
  }
};
