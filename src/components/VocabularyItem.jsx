import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Left, Right, Item } from 'native-base';
import {setCurrentWord} from '../redux/Actions';

export default function VocabularyItem({ word, navigation, dispatch }) {
    const onClickHandler = async () => {
        await dispatch(setCurrentWord(word));
        navigation.navigate('Search');
    }

    return (
        <Item style={styles.wrapper} onPress={onClickHandler}>
            <Left>
                <Text style={styles.word}>{word}</Text>
            </Left>
            <Right>
                {/* <Icon name="menu" /> */}
            </Right>
        </Item>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center"
    },

    wrapper: {
        height: 60,
        borderBottomColor: "#ababab",
        borderBottomWidth: 1,
        padding: 20,
    },

    word: {
        fontSize: 20
    },
});