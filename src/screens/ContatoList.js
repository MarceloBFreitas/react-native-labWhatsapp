import React, {Component} from 'react';
import  {View,Text,StyleSheet,FlatList,TouchableHighlight,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import   ContatoItem   from '../components/ContatoList/ContatoItem';
import  { getContactList ,createChat} from '../actions/ChatActions';

export class ContatoList extends Component{

    static navigationOptions = {
        title:'',
        tabBarLabel:'Contatos',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {
            loading:true
        };
        console.disableYellowBox = true;
        this.contatoClick = this.contatoClick.bind(this);
        this.props.getContactList(this.props.uid, ()=>{
            this.setState({loading:false});
        });  //passando o usuário logado como parâmetro para filtrar a lista
        
    }

    contatoClick(item){
        //alert('Chamando: '+item.name+' Key:'+item.key);
        let found = false;
        for(var i in this.props.chats){
            if(this.props.chats[i].other==item.key){
                found=true;
            }
        }
        if(found==false){
            this.props.createChat(this.props.uid,item.key); 
            this.props.navigation.navigate('ConversasStack'); //mandar para a stacknavigator
        }else{
            alert('já existe conversa');
        }
    }

    render(){
        return(
            <View style={styles.container}>
             {this.state.loading && <ActivityIndicator size='large'/>  /*CONDIÇÃO TERNÁRIA PARA APARECER O LOADING*/}
                <FlatList
                    data ={this.props.contacts}
                    renderItem = {({item}) => (
                        <TouchableHighlight 
                        underlayColor="#DDDDDD"
                        style={styles.buttonArea} onPress={() => this.contatoClick(item)}>
                          <View >
                            <Text>{item.name}</Text>
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
        uid:state.auth.uid,
        contacts:state.chat.contacts,
        chats:state.chat.chats
    };
};

//checklogin são as ações que podem ser executadas nessa tela, final a tela que vai abrir
const ContatoListConnect = connect(mapStateToProps,{getContactList,createChat })(ContatoList);

export default ContatoListConnect;