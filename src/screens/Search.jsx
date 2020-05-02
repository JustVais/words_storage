import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, RefreshControl } from 'react-native';
import { Icon, Left, Right, Item, Button } from 'native-base';
import { PacmanIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { setWordInfo } from '../redux/Actions';
import WordDefinition from '../components/WordDefinition';

import Menu from '../components/Menu';

function Search({ navigation, currentWord, wordInfo, dispatch }) {

  const [loading, SetLoading] = useState(true);
  const [isFavorite, SetIsFavorite] = useState(false);


  useEffect(() => {
    getWordInfo();
  }, [currentWord]);

  let getWordInfo = () => {
    SetLoading(true);

    fetch("https://api.dictionaryapi.dev/api/v1/entries/en/" + currentWord, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => {
        if (!!json[0] && Object.keys(json[0].meaning).length !== 0) {
          dispatch(setWordInfo(json[0].meaning));
        } else {
          dispatch(setWordInfo(undefined));
        }

        return getWordFromStorage(currentWord);
      })
      .then((info) => {
        if (info !== null)
          SetIsFavorite(true)
        else
          SetIsFavorite(false);
        SetLoading(false);
      });
  }

  let addOrRemoveWordFromMyVocabulary = async () => {
    if (await getWordFromStorage(currentWord) === null) {
      await setWordToStorage(currentWord);
    } else {
      await removeWordFromStorage(currentWord);
    }

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Vocabulary' }],
    // });
  }

  let getWordFromStorage = async (word) => {
    return await AsyncStorage.getItem(word);
  }

  let setWordToStorage = async (word) => {
    await AsyncStorage.setItem(word, word);
    SetIsFavorite(true);
  }

  let removeWordFromStorage = async (word) => {
    await AsyncStorage.removeItem(word);
    SetIsFavorite(false);
  }

  // const wait = (timeout) => {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, timeout);
  //   });
  // }

  const onRefresh = () => {
    // setRefreshing(true);
    getWordInfo();
    // wait(1000).then(() => setRefreshing(false));
  }

  return (
    <>
      <Menu navigation={navigation} SetLoading={SetLoading} />
      {
        loading ?
          <View style={styles.loadingBarContainer}>
            <PacmanIndicator color='#36393E' />
          </View>
          :
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} />
            }>

            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.currentWord}>{currentWord}</Text>
              </View>
              <View style={styles.headerRight}>
                <Button transparent onPress={addOrRemoveWordFromMyVocabulary}>
                  <Icon name="ios-star" style={isFavorite ? styles.isFavorite : styles.isNotfavorite} />
                </Button>
              </View>
            </View>
            {
              !!wordInfo ?
                <View>
                  {
                    Object.keys(wordInfo).map((value, index) =>
                      <WordDefinition
                        meaning={Object.keys(wordInfo)[index]}
                        definition={wordInfo[value][0].definition}
                        example={wordInfo[value][0].example}
                        isLast={index === Object.keys(wordInfo).length - 1 ? true : false}
                        key={index} />
                    )
                  }
                </View>
                :
                <View style={styles.notFoundContainer}>
                  <Text>Word not found</Text>
                </View>
            }
          </ScrollView>
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentWord: state.currentWord,
    wordInfo: state.wordInfo
  };
}

export default connect(mapStateToProps)(Search);

let styles = StyleSheet.create({
  container: {
    margin: 10
  },

  currentWord: {
    fontSize: 30,
  },

  loadingBarContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  notFoundContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },

  isNotfavorite: {
    fontSize: 30,
    // backgroundColor: "red",
    color: "#36393E"
  },

  isFavorite: {
    fontSize: 30,
    color: "#4e77ad"
  },

  header: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#36393E",
    borderBottomWidth: 2,
    alignItems: "center",
    height: 60,
    // backgroundColor: "red"
  },

  headerLeft: {
    flex: 1
  },

  headerRight: {
  }
});
