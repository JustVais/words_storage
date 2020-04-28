import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { setWordInfo } from '../redux/Actions';
import WordDefinition from '../components/WordDefinition';

import Menu from '../components/Menu';

function Search({ navigation, currentWord, wordInfo, dispatch }) {

    let [loading, SetLoading] = useState(true);

    useEffect(() => {
        getWordInfo();
    }, [currentWord]);

    let getWordInfo = () => {
        SetLoading(true);

        fetch("https://api.dictionaryapi.dev/api/v1/entries/en/" + currentWord, { method: 'GET' })
            .then((res) => res.json())
            .then((json) => {
                if (!!json[0]) {
                    dispatch(setWordInfo(json[0].meaning));
                } else {
                    dispatch(setWordInfo(undefined));
                }
                SetLoading(false);
            });
    }

    return (
        <>
            <Menu navigation={navigation} />
            {
                loading ?
                    <View style={styles.loadingBarContainer}>
                        <PacmanIndicator color='#36393E' />
                    </View>
                    :
                    <ScrollView
                        style={styles.container}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>

                        <Text style={styles.currentWord}>{currentWord}</Text>
                        {
                            !!wordInfo ?
                                <View>
                                    {
                                        Object.keys(wordInfo).map((value, index) =>
                                            <WordDefinition
                                                meaning={Object.keys(wordInfo)[index]}
                                                definition={wordInfo[value][0].definition}
                                                example={wordInfo[value][0].example}
                                                isLast={index === Object.keys(wordInfo).length-1 ? true : false}
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
        borderBottomColor: "#36393E",
        borderBottomWidth: 2
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
});
