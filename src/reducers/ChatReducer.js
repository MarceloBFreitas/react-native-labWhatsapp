const initialState = {    //estado inicial do reducer, necessário adicionar ele no Reducers.js
    chats:[],
    contacts:[],
    activeChat:'',
    activeChatTitle:'',
    activeChatMessages:[]
};

//funcao anonima, recebe a informação da Action
const ChatReducer = ( state = initialState, action) =>{
    
    if(action.type == "setChatList"){
        return { ...state, chats:action.payload.chats};
    }

    if(action.type ==  'setContactList'){
        //alert("retorno: "+action.payload.status);
        
        contacts = [];
        action.payload.users.forEach((childItem)=>{
            contacts.push(childItem);
            //alert(childItem.name);
        })
        return { ...state, contacts:contacts};
    }
    
    if(action.type == 'setActiveChatMessage'){
        let tempArray = [];
        tempArray=  action.payload.msgs;
        return {...state, activeChatMessages:tempArray};
    }

    if(action.type=='setActiveChat'){
        //para passar o parametro do titulo (nome) da conversa basta pegar no array chats [] que já foi criado
        let chatTitle ='';
        for(var i in state.chats){
            if(state.chats[i].key==action.payload.chatId){
                chatTitle =  state.chats[i].title;
            }
        }

        return { ...state, activeChat:action.payload.chatId,activeChatTitle:chatTitle};
    }


    return state;
};

export default ChatReducer;