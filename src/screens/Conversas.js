import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
//import { connect } from 'react-redux'; // para acessar o reducer

import ConversasStack from './ConversasStack';
import ContatoList from './ContatoList';
import Config from './Config';

const Conversasnavigator = TabNavigator({
    ConversasStack:{
        screen:ConversasStack,
        navigationOptions:{
            tabBarLabel:'Conversas',
            header:null,
            
        }
    },
    ContatoList:{
        screen:ContatoList,
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
    Config:{
        screen:Config
    }
},{
    tabBarPosition:'bottom',
    animationEnabled:false,
    swipeEnabled:false

});

export default Conversasnavigator;