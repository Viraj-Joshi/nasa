import app from 'firebase/app'
import 'firebase/auth' // import auth package from firebase
const config = {
    apiKey: "AIzaSyAy2uu5psQ0L3FEyuuxoLkveYLxKySFMFQ",
    authDomain: "nasa-images-3675.firebaseapp.com",
    databaseURL: "https://nasa-images-3675.firebaseio.com",
    projectId: "nasa-images-3675",
    storageBucket: "nasa-images-3675.appspot.com",
    messagingSenderId: "760793418050"
};
class fire{
    constructor(){
        app.initializeApp(config);

        this.auth = app.auth();  //instantiate 
    }

    doCreateUserWithEmailAndPassword = (email,password) =>
        this.auth.createUserWithEmailAndPassword(email,password);
    
    doSignInWithEmailAndPassword = (email,password) =>
        this.auth.signInWithEmailAndPassword(email,password);
    //if no user is authenticated, nothing will happen when called
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    
}

export default fire;
