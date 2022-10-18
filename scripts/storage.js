import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCounters = async () => {
  try {
    let temp = await AsyncStorage.getItem('counters');
    if (temp !== null) {
      console.log('loaded counters');
      return JSON.parse(temp);
    } else {
      console.log('no counters available');
      return [];
    }
  } catch (e) {
    console.error('Failed to load counters.', e);
  }
};

export const storeCounter = async (counter) => {
  try {
    let counters = await loadCounters();
    counters = [...counters, counter];

    // counters = [];

    await AsyncStorage.setItem('counters', JSON.stringify(counters));
    console.log('saved counters');
  } catch (e) {
    console.error('Failed to save counters.', e);
  }
};
