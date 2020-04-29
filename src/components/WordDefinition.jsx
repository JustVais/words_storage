import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

function WordDefinition({ meaning, definition, example, isLast}) {
    return (
        <View style={isLast ? styles.containerWithOutBorder : styles.containerWithBorder}>
            <Text style={styles.meaning}>{ "• " + meaning + ":"}</Text>
            <Text style={styles.descriptionHeader}>
                Definition: 
                <Text style={styles.descriptionText}>
                    {" "+ definition}
                </Text>
            </Text>
            <Text style={styles.descriptionHeader}>
                Example:
                <Text style={styles.descriptionText}>
                    {" "+ example}
                </Text>
            </Text>
        </View>
    );
}

export default WordDefinition;

const styles = StyleSheet.create({
    containerWithBorder: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#000"
    },

    containerWithOutBorder: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    meaning: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    
    descriptionHeader: {
        fontSize: 16,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 2,
        marginBottom: 2
    },
    
    descriptionText: {
        fontStyle: "normal"
    },
});