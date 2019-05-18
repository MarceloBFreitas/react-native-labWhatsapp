const initialState = {
    name:'',
    uid:'',
    email:'',
    password:'',
    status:0
};

//funcao anonima, recebe a informação da Action
const AuthReducer = ( state = initialState, action) =>{

    if(action.type ==  'changeStatus'){
        //alert("retorno: "+action.payload.status);
        return { ...state,status:action.payload.status};
    }

    if(action.type=="changeEmail"){
        return{...state,email: action.payload.email}
    }

    if(action.type=="changeSenha"){
        return{...state, password:action.payload.senha}
    }

    if(action.type =="changeName"){
        return{...state, name:action.payload.name}
    }

    if(action.type =="changeUid"){
        return{...state, status:1,uid:action.payload.uid}
    }
    return state;
};

export default AuthReducer;