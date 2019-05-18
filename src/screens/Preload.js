import React, {Component} from 'react';
import  {View,Text,StyleSheet,Image} from 'react-native';
import { connect } from 'react-redux';
import  { checkLogin } from '../actions/AuthActions';
import { NavigationActions,StackActions } from 'react-navigation';
export class Preload extends Component{

    static navigationOptions = {
        title:'',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {};
        this.directPages = this.directPages.bind(this);
        this.props.checkLogin();

        //Variavel global criada para acesso das páginas do stacknavigator pelas páginas no TabNavigator
        window.globalNavigator = this.props.navigation;
    }

    directPages(){
         //redirecionamento
         if(this.props.status==1){
            //this.props.navigation.navigate('Home'); //essa forma permite o botão voltar, nesse caso para a tela de preload
            //necessário zerar a navegação
            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Conversas" })],
              });
            
            this.props.navigation.dispatch(navigateAction);
        }
         if(this.props.status==2){
            //this.props.navigation.navigate('Home'); //essa forma permite o botão voltar, nesse caso para a tela de preload
            //necessário zerar a navegação
            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Home" })],
              });
            
            this.props.navigation.dispatch(navigateAction);
        }
    }

    //chamada quando algo na tela muda
    componentDidUpdate(){
        this.directPages();
    }
    //quando o aplicativo é reaberto
    componentDidMount(){
        this.directPages();
    }
    render(){
        return(
            <View style={styles.container}>
                <Image   style={styles.imagelogo} source={require('../assets/images/logo.png')}/>
                <Text>Carregando...</Text>
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
    imagelogo:{
        maxWidth:'50%',
        maxHeight:'30%',
        justifyContent:'center',
        alignItems:'center'
    }
});




//retorna user e senha por exemplo
const mapStateToProps = (state)=>{
    return {
        status:state.auth.status
    };
};

//checklogin são as ações que podem ser executadas nessa tela, final a tela que vai abrir
const PreloadConnect = connect(mapStateToProps,{ checkLogin})(Preload);

export default PreloadConnect;