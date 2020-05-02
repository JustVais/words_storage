import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, ScrollView, AsyncStorage, FlatList, VirtualizedList, SafeAreaView, RefreshControl, Dimensions } from 'react-native';
import { Left, Right, Item } from 'native-base';

import { connect } from 'react-redux';

import VocabularyItem from '../components/VocabularyItem';


function Vocabulary({ navigation, dispatch }) {

    const [vocabulary, setVocabulary] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getAllWordsFromStorage();
        });

        return () => {
            navigation.removeEventListener('focus', () => {
                getAllWordsFromStorage();
            })
        }
    }, []);

    const getAllWordsFromStorage = async () => {
        setVocabulary(await AsyncStorage.getAllKeys());
    }

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = () => {
        setRefreshing(true);
        getAllWordsFromStorage();
        wait(1000).then(() => setRefreshing(false));
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {
                vocabulary.map((word, index) =>
                    <VocabularyItem key={index} word={word} navigation={navigation} dispatch={dispatch} />
                )
            }
        </ScrollView>
    );
}

export default connect()(Vocabulary);

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
    }
});