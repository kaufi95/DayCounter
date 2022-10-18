import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CountDown from 'react-native-countdown-component';

const Counter = (props) => {
  const date = (new Date(props.counter.item.date) - new Date()) / 1000;
  const name = props.counter.item.name;

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name}</Text>
      <CountDown until={date} onFinish={() => alert('finished')} onPress={() => alert('hello')} size={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Counter;
