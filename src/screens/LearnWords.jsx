import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {setCurrentWord} from '../redux/Actions';

import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

import Button from '../components/Button'

import { PacmanIndicator } from 'react-native-indicators';

function LearnWords({ navigation, dispatch}) {
  const [randWord, setRandWord] = useState("");
  const [isWaitingForWord, setIsWaitingForWord] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWordFromStorage();
  }, []);

  const getWordFromStorage = async () => {
    if (!isWaitingForWord) {
      setIsWaitingForWord(true);

      let allWords = await AsyncStorage.getAllKeys();

      let randNumOfWord = Math.floor(Math.random() * Math.floor(allWords.length));

      setRandWord(allWords[randNumOfWord]);
      setIsLoading(false);
      setIsWaitingForWord(false);
    }
  }

  const checkWordDefinitions = async () => {
    await dispatch(setCurrentWord(randWord));
    navigation.navigate('Search');
  }

  return (
    <>
      {
        isLoading ?
          <View style={styles.loadingBarContainer}>
            <PacmanIndicator color='#36393E' />
          </View>
          :
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Text style={styles.word}>{randWord}</Text>
              <View style={styles.buttonsContainter}>
                <Button
                  title="Definition"
                  style={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                  onPress={checkWordDefinitions} />
                <Button
                  title="Next"
                  style={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                  onPress={getWordFromStorage} />
              </View>
            </View>
          </View>
      }
    </>
  );
}

export default connect()(LearnWords);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  wrapper: {
    width: 300,
    alignItems: "center"
  },

  word: {
    fontSize: 30,
    marginBottom: 40
  },

  buttonsContainter: {
    justifyContent: "center",
    flexDirection: "row"
  },

  buttonStyle: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    backgroundColor: "#36393E",
    margin: 8
  },

  buttonTextStyle: {
    color: "#fff",
    fontSize: 20
  },

  loadingBarContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});