import React, {Component} from 'react';
import  {View,Modal,StyleSheet,ActivityIndicator} from 'react-native';

export class LoadingItem extends Component{

    constructor(props){
        super(props)
        this.state = { };
    }

    render(){
        return(
            <Modal animationType="none" transparent visible={this.props.visible}>
                <View style={StyleSheet.loading}>
                    <ActivityIndicator size='large' />
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    loading:{
        position:'absolute',
        bottom:0,
        top:0,
        left:0,
        right:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000000',
        opacity:0.5
    }
});