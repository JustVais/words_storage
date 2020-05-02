import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import Search from '../screens/Search';
import Vocabulary from '../screens/Vocabulary';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Search">
                <Drawer.Screen name="Search" component={Search} />
                <Drawer.Screen name="Vocabulary" component={Vocabulary} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}