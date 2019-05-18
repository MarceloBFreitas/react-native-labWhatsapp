import React, {Component} from 'react';
import  {View,Text,StyleSheet,Button,TextInput,YellowBox,Keyboard} from 'react-native';
import { connect } from 'react-redux';
import  { checkLogin,changeEmail,changeSenha,changeName,SingUpAction } from '../actions/AuthActions';
import { LoadingItem } from '../components/LoadingItem';
import _ from 'lodash';

export class SignUp extends Component{

    static navigationOptions = {
        title:'Cadastrar'
    }

    constructor(props){
        super(props);
        this.state = {
            loading:false
        };

        YellowBox.ignoreWarnings(['Setting a timer']);
        const _console = _.clone(console);
        console.warn = message => {
            if (message.indexOf('Setting a timer') <= -1) {
                _console.warn(message);
            }
        };
    }
    componentDidUpdate(){
        if(this.props.status==1){
            Keyboard.dismiss();
            this.props.navigation.navigate('Conversas');
        }
    }
   
    render(){
        return(
            <View style={styles.container}>

                <Text style={styles.h1}>Digite seu Nome</Text>
                <TextInput style={styles.input} value={this.props.name} onChangeText={this.props.changeName}/>

                <Text style={styles.h1}>Digite seu Email</Text>
                <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail}/>

                <Text style={styles.h1}>Digite sua Senha</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.props.senha} onChangeText={this.props.changeSenha}/>
                

                <Button title="Cadastrar" onPress={()=>{
                    this.setState({loading:true});
                    this.props.SingUpAction(this.props.name,this.props.email,this.props.senha,()=>{this.setState({loading:false});});
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        height:50,
        width:'80%',
        fontSize:23,
        backgroundColor:'#DDDDDD'
    }
});




//retorna user e senha por exemplo
const mapStateToProps = (state)=>{
    return {
        //conectar o Reducer do User
        email:state.auth.email,
        senha:state.auth.password,
        name:state.auth.name,
        status:state.auth.status
    };
};

//checklogin são as ações que podem ser executadas nessa tela, final a tela que vai abrir
const SignUpConnect = connect(mapStateToProps,{ checkLogin , changeEmail,changeSenha,changeName,SingUpAction})(SignUp);

export default SignUpConnect;