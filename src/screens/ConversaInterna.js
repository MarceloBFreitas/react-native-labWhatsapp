import React, {Component} from 'react';
import  {Modal,View,Text,StyleSheet,Platform,TouchableHighlight,Image, BackHandler,Keyboard,KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux';
import  { setActiveChat ,sendMessage,monitorChat,monitorChatOff,sendImage} from '../actions/ChatActions';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import MensagemItem from '../components/ConversaInterna/MensagemItem';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

export class ConversaInterna extends Component{

    static navigationOptions = ({navigation})=>({
        title: navigation.state.params.title,
        //tabBarVisible:false, alterado em ConversaStack
        headerLeft:(
            <TouchableHighlight onPress={()=>{
                //adaptação usando o navigation, tipo uma variavel global pq aqui não tenho acesso as props
                navigation.state.params.voltarFunction()
            }} underlayColor={false}>
                <Image source={require('../../node_modules/react-navigation-stack/dist/views/assets/back-icon.png')} style={{width:25,heigth:25,marginLeft:20}}/>
            </TouchableHighlight>
        )
        
    })

    constructor(props){
        super(props);
        this.state = {
            inputText:'',
            pct:0,
            modalVisible:false,
            modalImage:null
        };
        console.disableYellowBox = true;
        this.voltar = this.voltar.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.choseImage = this.choseImage.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this); 
        this.imagePress = this.imagePress.bind(this);
    }

    componentDidMount(){
        //quando o componente for montado para exibir na tela
        this.props.navigation.setParams({voltarFunction:this.voltar});
        //para usar o hardware do bt voltar e acionar um listener
        BackHandler.addEventListener('hardwareBackPress',this.voltar);


        //criar a action que vai iniciar o Listener passando o id do chat a ser monitorado
        this.props.monitorChat(this.props.activeChat);


    }

    componentWillUnmount(){
        //quando for para outra tela e remover um listener
        BackHandler.removeEventListener('hardwareBackPress',this.voltar);

          
    }

    setModalVisible(status){
        let state = this.state;
        state.modalVisible=status;
        this.setState(state);
    }

    imagePress(img){
        let state = this.state;
        state.modalImage=img;
        this.setState(state);

        this.setModalVisible(true);
    }

    voltar(){
       
        //parar o monitoramente do chat
        this.props.monitorChatOff(this.props.activeChat);


        this.props.setActiveChat('');
        this.props.navigation.goBack();

        //precisa deste retorno para não fechar o app
        return true;
    }

    sendMsg(){
        let txt = this.state.inputText;
        let state = this.state;
        state.inputText='';
        this.setState(state);
        //alert(txt);
        Keyboard.dismiss();
        this.props.sendMessage('text',txt,this.props.uid,this.props.activeChat);

    }

    choseImage(){
        ImagePicker.showImagePicker(null,(r)=>{
            if(r.uri){
                //let img = {uri:r.uri};
                
                //let state = this.state;
                //state.imageTemp = img;
                //this.setState(state);
                //coreção de URI no IOS
                let uri = r.uri.replace('file://','');

                RNFetchBlob.fs.readFile(uri,'base64')
                    .then((data)=>{
                        return RNFetchBlob.polyfill.Blob.build(data, {type:'image/jpeg;BASE64'});
                    })
                        .then((blob)=>{
                            this.props.sendImage(
                                blob
                                ,(snapshot)=>{
                                    //quantidade de bytes transferida
                                    //quantidade de bytes total
                                    let pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    let state = this.state;
                                    state.pct = pct;
                                    this.setState(state);

                                }
                                ,(imgName)=>{
                                //alert('Imagem salva com sucesso'+ imgName);
                                let state = this.state;
                                state.pct = 0;
                                this.setState(state);
                                this.props.sendMessage('image',imgName,this.props.uid,this.props.activeChat);
                            });
                        });

            }
        });
    }
    //Não fazer import do FlatList #############################################################
    //Não fazer import do TextInput #############################################################
    render(){
        let AreaBehavior = Platform.select({ios:'padding',android: null});
        let AreaOffset = Platform.select({ios: 64 ,android: null});
        return(
            <KeyboardAvoidingView style={styles.container}
                behavior={AreaBehavior} keyboardVerticalOffset={AreaOffset}>

                <FlatList style={styles.chatArea}
                    ref={(ref)=>{ this.chatArea = ref }}
                    onContentSizeChange={()=>{this.chatArea.scrollToEnd({animated:true})}}
                    onLayout={()=>{this.chatArea.scrollToEnd({animated:true})}}
                    data={this.props.activeChatMessages}
                    renderItem={({item}) => <MensagemItem data={item} 
                    me={this.props.uid} 
                    onImagePress={this.imagePress}
                    />}
                />
                {this.state.pct >0 &&
                    <View style={styles.imageTmp}> 
                        <View style={[ {width:this.state.pct+'%'} , styles.imageTmpBar ]}></View>
                    </View>
                }
                <View style={styles.sendArea}>
                    <TouchableHighlight style={styles.imageButtom}  onPress={this.choseImage}>
                        <Image style={styles.imageBtnImage}   source={require('../assets/images/fotoapp.png')}/>
                    </TouchableHighlight>
                    <TextInput  style={styles.sendInput} 
                        value={this.state.inputText}
                        onChangeText={(inputText)=>{this.setState({inputText})}}  />
                    <TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
                        <Image   style={styles.sendImage} source={require('../assets/images/ico-enviar.png')}/>
                    </TouchableHighlight>
                </View>

                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <TouchableHighlight style={styles.modalView} onPress={()=>{ this.setModalVisible(false)}}> 
                        <Image resizeMode='contain' style={styles.modalImage} source={{uri:this.state.modalImage}}/>
                    </TouchableHighlight>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    chatArea:{
        flex:1,
        backgroundColor:'#CCCCCC'
    },
    sendArea:{
        height:50,
        backgroundColor:'#EEEEEE',
        flexDirection:'row'
    },
    sendInput:{
        height:50,
        flex:1
    },
    sendButton:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    sendImage:{
        height:40,
        width:40
    },
    imageButtom:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    imageBtnImage:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center'
    },
    imageTmp:{
        height:10
    },
    imageTmpBar:{
        height:10,
        backgroundColor:'#FF0000' 
    },
    modalView:{
        backgroundColor:'#000000',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalImage:{
        width:'100%',
        height:'100%'
    }

});




//retorna user e senha por exemplo
const mapStateToProps = (state)=>{
    return {
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chat.activeChat,
        activeChatMessages:state.chat.activeChatMessages
    };
};

//checklogin são as ações que podem ser executadas nessa tela, final a tela que vai abrir
const ConversaInternaConnect = connect(mapStateToProps,{ setActiveChat,sendMessage,monitorChat,monitorChatOff,sendImage})(ConversaInterna);

export default ConversaInternaConnect;