import firebase from '../FirebaseConection';

export const checkLogin = () =>{
    return (dispatch) =>{    //usar o thunk para guardar o firebase
        
        //alteração para permancer logado, adicionando "olheiro do firebase"
        firebase.auth().onAuthStateChanged((user)=>{
            //let user = firebase.auth().currentUser;

            if(user){
                //user logado
                dispatch({
                    type:'changeUid', //changeStatus  alterado para pegar o Uid nesta action que já muda o status do usuário
                    payload:{
                        //status:1
                        uid:user.uid
                    }
                });
            }else{
                //não logado
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status:2   //0 = Nada verificado
                    }
                });
            }
        });
    }
};

export const SignOut = () =>{
    firebase.auth().signOut();
    return {
        type:'changeStatus',
        payload:{
            status:2
        }
    };
};

//Action do redux thunk
export const SingUpAction = (name,email,pass,callback) => {
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(email,pass)
        .then((user)=>{
            //pegar o usuário criado
            let uid = firebase.auth().currentUser.uid;

            //salvar ele no banco
            firebase.database().ref('users').child(uid).set({
                name:name
            });
            callback();
            //retornar o dispacth para atualizar o uid dentro do reducer
            dispatch({
                type:'changeUid',
                payload:{
                    uid:uid   //0 = Nada verificado
                }
            });
        })
        .catch((error)=>{
            switch(error.code){
                case 'auth/email-alredy-in-use':
                    alert('Email já está em Uso');
                    break;
                case 'auth/invalid-email':
                    alert('Email Inválido');
                    break;
                case 'auth/operation-not-allowed':
                    alert('Tente novamente em alguns minutos');
                    break;
                case 'auth/weak-password':
                    alert('Digite uma senha melhor');
                    break;
            }
            callback();
        });
    };
}

export const SignInAction = (email,senha,callback) =>{
    return (dispatch) =>{
        firebase.auth().signInWithEmailAndPassword(email,senha)
        .then((user)=>{
            //pegar o usuário criado
            let uid = firebase.auth().currentUser.uid;
            //retornar o dispacth para atualizar o uid dentro do reducer

            callback();
            dispatch({
                type:'changeUid',
                payload:{
                    uid:uid   //0 = Nada verificado
                }
            });
        })
        .catch((error)=>{
            switch(error.code){
                case 'auth/invalid-email':
                    alert('Email inválido');
                    break;
                case 'auth/disabled':
                    alert('Seu Usuário está Desativado');
                    break;
                case 'auth/user-not-found':
                    alert('Não existe este Usuário');
                    break;
                case 'auth/wrong-password':
                    alert('Email e/ou senha inválido(s)');
                    break;
            }
            callback();
        });
    };
}

export const changeEmail = (email) =>{
    return {
        type:'changeEmail',
        payload:{
            email:email
        }
    };
}

export const changeSenha = (senha) =>{
    return{
        type:'changeSenha',
        payload:{
            senha:senha
        }
    };
}

export const changeName = (name) =>{
    return{
        type:'changeName',
        payload:{
            name:name
        }
    };
}

