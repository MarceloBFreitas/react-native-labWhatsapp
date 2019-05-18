import React, {Component} from 'react';
import  {View,Text,StyleSheet,Button} from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import { connect } from 'react-redux';
import  { SignOut } from '../actions/AuthActions';

export class Config extends Component{

    static navigationOptions = {
        title:'',
        tabBarLabel:'Config.',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {};
        console.disableYellowBox = true;
        this.sair = this.sair.bind(this);
    }

    sair(){
        this.props.SignOut();

        window.globalNavigator.navigate('Home');
        //resetar a navegação
       /*
        this.props.navigation.dispatch(StackActions.reset({
            index:0,  //zerar histórico
            actions:[
                NavigationActions.navigate({routeName:'Home'})
            ]
        }));
        */
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Página Config</Text>
                <Button title="Sair" onPress={this.sair}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin:10
    }
});




//retorna user e senha por exemplo
const mapStateToProps = (state)=>{
    return {
        status:state.auth.status,
        uid:state.auth.uid
    };
};

//checklogin são as ações que podem ser executadas nessa tela, final a tela que vai abrir
const ConfigConnect = connect(mapStateToProps,{ SignOut})(Config);

export default ConfigConnect;