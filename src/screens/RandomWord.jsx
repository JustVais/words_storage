import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

import Button from '../components/Button'

import { PacmanIndicator } from 'react-native-indicators';

function RandomWord() {

    const [randWord, setRandWord] = useState("");
    const [isWaitingForWord, setIsWaitingForWord] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNewWord();
    }, []);

    const getNewWord = () => {
        if (!isWaitingForWord) {
            setIsWaitingForWord(true);

            fetch("https://random-word-api.herokuapp.com/word", { method: 'GET' })
                .then((res) => res.json())
                .then((json) => {
                    setRandWord(json[0]);
                    setIsLoading(false);
                    setIsWaitingForWord(false);
                });
        }
    }

    const addWordToVocabulary = () => AsyncStorage.setItem(randWord, randWord);

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
                                    title="Add"
                                    style={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={addWordToVocabulary} />
                                <Button
                                    title="Next"
                                    style={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={getNewWord} />
                            </View>
                        </View>
                    </View>
            }
        </>
    );
}

export default RandomWord;

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