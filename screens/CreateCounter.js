import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { storeCounter } from '../scripts/storage';

const CreateCounter = ({ navigation }) => {
  let name = '';
  let date = new Date();

  const [mode, setMode] = useState('date');

  const setHeader = () => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => saveCounter()} title="Save" />
    });
  };

  const saveCounter = () => {
    let counter = {
      name: name,
      date: date
    };
    storeCounter(counter);
    navigation.navigate('Home');
  };

  const onChange = (event, selectedDate) => {
    date = selectedDate;
  };

  const switchMode = () => {
    mode == 'date' ? setMode('time') : setMode('date');
  };

  return (
    <View style={styles.containerView}>
      <TextInput
        placeholder="Counter name"
        style={styles.input}
        onChangeText={(value) => {
          name = value;
          setHeader();
        }}
      />
      <DateTimePicker
        style={styles.dtp}
        value={date}
        display="spinner"
        mode={mode}
        is24Hour={true}
        onChange={onChange}
      />
      <Button onPress={switchMode} title={mode == 'date' ? 'Switch to time' : 'Switch to date'} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    width: '80%'
  },
  dtp: {
    width: '80%'
  }
});

export default CreateCounter;
