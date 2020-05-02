import React from 'react';

import { View, Text, TextInput } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Search from '../screens/Search';
import RandomWordNavigator from './RandomWordNavigator';
import VocabularyNavigator from './VocabularyNavigator';
import LearnWordsNavigator from './LearnWordsNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name="Search" component={Search} />
				<Drawer.Screen name="Vocabulary" component={VocabularyNavigator}/>
				<Drawer.Screen name="Random word" component={RandomWordNavigator}/>
				<Drawer.Screen name="Learn words" component={LearnWordsNavigator}/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;