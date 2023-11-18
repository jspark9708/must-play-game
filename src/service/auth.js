import firebase from 'firebase/compat/app';
import firebaseApp from './firebase';

class AuthService{
    login(){
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }
    getUserEmail() {
        const user = firebaseApp.auth().currentUser;
        return user ? user.email : null;
    }
}

export default AuthService;