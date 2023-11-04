import firebase from 'firebase/compat/app';
import firebaseApp from './firebase'; // 가정: firebaseApp을 가져오는 방식에 따라 다를 수 있습니다.

class AuthService{
    login(){
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return firebaseApp.auth().signInWithPopup(authProvider);

    }
}

export default AuthService;