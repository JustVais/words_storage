import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LearnWords from '../screens/LearnWords';

const LearnWordsStack = createStackNavigator();

function LearnWordsNavigator() {
  return (
    <LearnWordsStack.Navigator>
      <LearnWordsStack.Screen name="Learn words" component={LearnWords} />
    </LearnWordsStack.Navigator>
  );
}

export default LearnWordsNavigator;