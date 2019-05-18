import firebase from '../FirebaseConection';

export const createChat = (userUid1,userUid2)=>{
    return (dispatch)=>{  //estrutura do Thunkx

        //criando o chat
        let newchat = firebase.database().ref('chats').push();

        newchat.child('members').child(userUid1).set({
            id:userUid1
        });

        newchat.child('members').child(userUid2).set({
            id:userUid1
        });

    
        //Associando aos envolvidos
        let chatId = newchat.key;


        //pegando nome dos usuários
        firebase.database().ref('users').child(userUid2).once('value').then((snapshot)=>{
            firebase.database().ref('users').child(userUid1).child('chats').child(chatId).set({
                id:chatId,
                title:snapshot.val().name,
                other:userUid2
            });
        });


        firebase.database().ref('users').child(userUid1).once('value').then((snapshot)=>{
            firebase.database().ref('users').child(userUid2).child('chats').child(chatId).set({
                id:chatId,
                title:snapshot.val().name,  ///alterar o getchatlist
                other:userUid1
            }).then(()=>{
                dispatch({
                    type:'setActiveChat',
                    payload:{
                        chatId:chatId
                    }
                });
            });
        });


        

        /*
        //um retorno para o reducer
        dispatch({
            type:'setActiveChat',
            payload:{
                chatId:chatId
            }
        });
        */

    }
}

export const setActiveChat = (chatId)=>{
    return {
        type:'setActiveChat',
        payload:{
            chatId:chatId
        }
    };
}

export const sendImage = (blob,progressCallback,successCallback) =>{
    return (dispatch) =>{
        //processo de envio para o firebase
        //criar um nome para a imagem
        let tmpKey = firebase.database().ref('chats').push().key;

        let fbimage = firebase.storage().ref('images').child(tmpKey);

        //para adicionar o progress como calback, foi adicionado um olheiro

        fbimage.put(blob,{contentType:'image/jpeg'})
            .on('state_changed',(snapshot)=>{
                //progresso
                progressCallback();
            },(error)=>{
                //erro
                alert(error.code);
            },()=>{
                //sucesso
                //successCallback(tmpKey); - Pular essa etapa já realizando o download aqui

                fbimage.getDownloadURL().then((url)=>{
                    successCallback(url); // salvar ans mensagens a url direta da imagem
                });
            });



        //fbimage.put(blob,{contentType:'image/jpeg'})
        //    .then(()=>{
        //
        //        successCallback(tmpKey);

        //    }).catch((error)=>{

        //        alert(error.code);
                
        //    });;
    }
}
export const sendMessage = (msgType, msgContent ,autor ,activeChat )=>{
    return (dispatch) =>{
      
        let currentDate='';
        let cDate = new Date();
        //ele pega o mes anterior, por isso a soma
        currentDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();
        currentDate +=' ';
        currentDate += +cDate.getHours()+':'+cDate.getMinutes()+':'+cDate.getSeconds();
        

        let msgId = firebase.database().ref('chats').child(activeChat).child('messages').push();
        

        switch(msgType){
            case 'text':
                msgId.set({
                    msgType:'text',
                    date:currentDate,
                    m:msgContent,
                    uid:autor
                });
                break;
            case 'image':
                msgId.set({
                    msgType:'image',
                    date:currentDate,
                    imgSource:msgContent,
                    uid:autor
                });
                break;
        }
       
    }
}
export const getChalList=(userUid , callback) =>{
    return (dispatch)=>{
        firebase.database().ref('users').child(userUid).child('chats').on('value',(snapshot)=>{
            let chats = [];
            snapshot.forEach((childItem)=>{
                chats.push({
                    key:childItem.key,
                    other:childItem.val().other,
                    title:childItem.val().title
                });
            });
            callback();
            dispatch({
                type:'setChatList',
                payload:{
                    chats :chats
                }
            });
        });
    };
}


export const monitorChat =(activeChat)=>{

    //processo de monitorar, necessário adicionar no ChatReducer um campo para salvar as conversas ativas
    return(dispatch)=>{
        firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('date').on('value',(snapshot)=>{
            let arrayMsg = [];
            
            
            snapshot.forEach((childItem)=>{

                switch(childItem.val().msgType){
                    case 'text':
                        arrayMsg.push({
                            key:childItem.key,
                            date:childItem.val().date,
                            msgType:'text',
                            m:childItem.val().m,
                            uid:childItem.val().uid
                        });
                        break;

                    case 'image':
                        arrayMsg.push({
                            key:childItem.key,
                            date:childItem.val().date,
                            msgType:'image',
                            imgSource:childItem.val().imgSource,
                            uid:childItem.val().uid
                        });
                        break;

                }

                
            });

            dispatch({
                type:'setActiveChatMessage',
                payload:{
                    msgs:arrayMsg
                }
            });
        });
    }
}

export const monitorChatOff =(activeChat)=>{ 
     return(dispatch)=>{
        firebase.database().ref('chats').child(activeChat).child('messages').off('value'); //tirar o olheiro do value
    }
}

export const getContactList= (userUid,callback)=>{
    return (dispatch)=>{
        firebase.database().ref('users').orderByChild('name').once('value').then((snapshot)=>{  
            // trocado "on" por "once" para que pegue uma única vez ao inves de usar olheiro
            //.on('value',(snapshot)=>{ 

            let users = [];
            
            snapshot.forEach((childItem)=>{
                if(childItem.key != userUid){
                    users.push({
                        key:childItem.key,
                        name:childItem.val().name
                    });
                }
            })
            callback();
            dispatch({
                type:'setContactList',  //criar no reducer
                payload:{
                    users:users
                }
            });
        }).catch((erro)=>{
            callback();
            alert(erro);   
        });
    };
};


