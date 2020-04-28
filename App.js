import React from 'react';
import { Provider, connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Store from './src/redux/Store';

import Home from './src/screens/Search';
import Drawer from './src/components/Drawer';

export default function App() {
    return (
        <Provider store={Store}>
            <Drawer />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});