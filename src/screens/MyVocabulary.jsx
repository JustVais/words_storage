import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, ScrollView, AsyncStorage, FlatList, VirtualizedList, SafeAreaView, RefreshControl, Dimensions } from 'react-native';
import { Left, Right, Item } from 'native-base';

import { connect } from 'react-redux';

import VocabularyItem from '../components/VocabularyItem';


function MyVocabulary({navigation, dispatch}) {

    const [vocabulary, setVocabulary] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        getAllWordsFromStorage();
    }, []);

    const getAllWordsFromStorage = async () => {
        setVocabulary(await AsyncStorage.getAllKeys());
        // await AsyncStorage.clear();
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
        <FlatList
            style={styles.container}
            data={vocabulary}
            renderItem={({ item }) => <VocabularyItem word={item} navigation={navigation} dispatch={dispatch}/>}
            keyExtractor={(word, index) => index}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
}  

export default connect()(MyVocabulary);

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
    }
});