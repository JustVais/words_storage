import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Header, Item, Input, Icon } from 'native-base';
import {setCurrentWord} from '../redux/Actions';


function Menu({ navigation, dispatch, SetLoading}) {

    let [inputText, setInputText] = useState("");

    let onClickDoneHandler = async () => {
        if (inputText.length != 0 && /^[a-zA-Z]+$/i.test(inputText)) {
            await SetLoading(true);
            dispatch(setCurrentWord(inputText.toLowerCase()));
            setInputText('');
        }
    }

    let onChangeTextHandler = (text) => setInputText(text);

    return (
        <>
            <Header style={styles.menu} androidStatusBarColor="#36393E" searchBar rounded>
                <Item>
                    <Icon name="search" />
                    <Input
                        placeholder="Input some word"
                        value={inputText}
                        onEndEditing={onClickDoneHandler}
                        onChangeText={onChangeTextHandler}
                    />
                </Item>
            </Header>
        </>
    );
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#36393E"
    }
});

export default connect()(Menu);