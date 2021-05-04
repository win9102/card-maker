import firebase from 'firebase'; // 삭제
import firebaseApp from './firebase'
// {firebaseAuth}로 교체, firebaseApp.auth(), firebase.auth() -> firebaseAuth
//{githubProvider, googleProvider}추가
class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        // new 이후 삭제 -> this.getProvider(providerName);
        /* getProvider(providerName){
            switch(providerName){
                case 'Google':
                    return googleProvider;
                case 'Github':
                    return  githubProvider;
                    default:
                    throw new Error(`이름이 올바르지 않습니다 ${providerName}`)
            }
            {    
            
        */
           
        
        return firebaseApp.auth().signInWithPopup(authProvider);
    }


    logout(){
        firebase.auth().signOut();
    }

    onAuthChange(onUserChanged){
        firebase.auth().onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }

}

export default AuthService;