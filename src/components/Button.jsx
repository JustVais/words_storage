import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

export default function Button({ style, title, textStyle = {}, onPress }) {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={onPress}>
            <View style={style}>
                <Text style={textStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}