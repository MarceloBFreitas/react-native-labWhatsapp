//Um stacknavigator, mesma de Conversas.js, pq vai ter duas telas
import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
//import { connect } from 'react-redux'; // para acessar o reducer

import ConversasList from './ConversasList';
import ConversaInterna from './ConversaInterna';


const ConversasStackNavigator = StackNavigator({
    ConversasList:{
        screen:ConversasList
    },
    ConversaInterna:{
        screen:ConversaInterna
    }
});

ConversasStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
};
export default ConversasStackNavigator;