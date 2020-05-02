import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RandomWord from '../screens/RandomWord';


const RandomWordStack = createStackNavigator();

function RandomWordNavigator() {
  return (
    <RandomWordStack.Navigator>
      <RandomWordStack.Screen name="Random word" component={RandomWord} />
    </RandomWordStack.Navigator>
  );
}

export default RandomWordNavigator;