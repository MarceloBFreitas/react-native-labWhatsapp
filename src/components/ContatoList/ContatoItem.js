import React, {Component} from 'react';
import {View, Text,TouchableHighLigth,StyleSheet} from 'react-native';

export default class ContatoItem extends Component{
    

    constructor(props){
        super(props);
    }
    
    
    render() {
        return (
            <TouchableHighLigth style={ContatoItemStyles.buttonArea} onPress={this.props.onPress}>  
                <Text>{this.props.data.name}</Text>
            </TouchableHighLigth>
            );
    }
}

const ContatoItemStyles = StyleSheet.create({
    buttonArea:{
        height:40
    }
});