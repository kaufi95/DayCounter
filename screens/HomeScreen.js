import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

import AnimatedLoader from 'react-native-animated-loader';

import Counter from '../components/Counter';

import { loadCounters } from '../scripts/storage';

const HomeScreen = ({ navigation }) => {
  const [counters, setCounters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => navigation.navigate('Create a Counter')} title="Add" />
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCounters().then((counters) => {
        setCounters(counters);
        setIsLoading(false);
      });
    }, [])
  );

  const renderCounters = () => {
    if (isLoading) {
      return (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../assets/loader.json')}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text>Loading content...</Text>
        </AnimatedLoader>
      );
    } else {
      if (counters) {
        return (
          <View style={styles.containerView}>
            <FlatList
              contentContainerStyle={styles.list}
              data={counters}
              spacing={10}
              renderItem={(item) => <Counter counter={item} />}
              extraData={counters}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.containerView}>
            <Text>No counters added yet.</Text>
            <Button onPress={() => navigation.navigate('Create a Counter')} title="Add your first counter" />
          </View>
        );
      }
    }
  };

  return renderCounters();
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
