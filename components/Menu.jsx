import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';

export default function Main() {
    return (
        <>
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                    </Item>
                </Header>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({

});