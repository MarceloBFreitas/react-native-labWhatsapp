import React, {Component} from 'react';
import  {View,Text,StyleSheet,Button,TabNavigator,FlatList,TouchableHighlight,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import  { getChalList,setActiveChat } from '../actions/ChatActions';

export class ConversasList extends Component{

    static navigationOptions = {
        title:'Conversas',
        tabBarlabel:'Conversas'
    }

    constructor(props){
        super(props);
        this.state = {
            loading:true
        };
        console.disableYellowBox = true;
        this.contatoClick = this.contatoClick.bind(this);
        this.props.getChalList(this.props.uid , ()=>{
            this.setState({loading:false});
        }); //Pegando a lista de conversas do usuaruio logado
    }

    componentDidUpdate(){  //ou componentWillUpdate
        if(this.props.activeChat != ''){
            //existe uma conversa que tem que ser aberta
            this.props.navigation.navigate('ConversaInterna', {title:this.props.activeChatTitle});
        }
    }

    contatoClick(item){
        //alert(item.key);
        this.props.setActiveChat(item.key);
    }
    render(){
        return(
            <View style={styles.container}>

                {this.state.loading && <ActivityIndicator size='large'/>  /*CONDIÇÃO TERNÁRIA PARA APARECER O LOADING*/}
                <FlatList 
                    data={this.props.chats}
                    renderItem = {({item}) => (
                        <TouchableHighlight 
                        underlayColor="#DDDDDD"
                        style={styles.buttonArea} onPress={() => this.contatoClick(item)}>
                          <View >
                            <Text>{item.title}</Text>
                          </View>
                        </TouchableHighlight>
                      )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin:10
    },
    buttonArea:{
        height:40,
        flex:1,
        justifyContent:'center',
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC'
    }
});




//retorna user e senha por exemplo
const mapStateToProps = (state)=>{
    return {
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chat.activeChat,
        chats:state.chat.chats,
        activeChatTitle:state.chat.activeChatTitle
    };
};

//checklogin são as ações que podem ser executadas nessa tela, final a tela que vai abrir
const ConversasListConnect = connect(mapStateToProps,{getChalList,setActiveChat })(ConversasList);

export default ConversasListConnect;