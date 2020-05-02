import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Vocabulary from '../screens/Vocabulary';


const VocabularyStack = createStackNavigator();

function VocabularyNavigator() {
  return (
    <VocabularyStack.Navigator>
      <VocabularyStack.Screen name="Vocabulary" component={Vocabulary} />
    </VocabularyStack.Navigator>
  );
}

export default VocabularyNavigator;