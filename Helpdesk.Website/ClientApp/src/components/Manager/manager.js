import firebase from "firebase";
import * as ROUTES from '../../constants/routes';

const userConfig = {
    apiKey: process.env.REACT_APP_API_KEY_USER,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_USER,
    databaseURL: process.env.REACT_APP_DATABASE_URL_USER,
    projectId: process.env.REACT_APP_PROJECT_ID_USER,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_USER,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_USER,
    appId: process.env.REACT_APP_APP_ID_USER,
};

class Manager {
    constructor(props) {
        this.props = props;

        //// Init Firebase ////
        firebase.initializeApp(userConfig);
        this.auth = firebase.auth();
        this.db = firebase.database();
        
        // Turn off Authentication Persistence
        this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }
    
    // Create User
    createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
    
    // Sign In
    signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    
    // Sign Out
    signOut = () => this.auth.signOut();

    // Password Email Reset
    passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
    
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });
    
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
    
    
    // TODO Update
    //// Requests ////
    request = {
        // Post Data to Backend
        post: async function(path, data) {
            let token = await firebase.auth().currentUser.getIdToken(true);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'firebaseJWT': token,
                },
                body: JSON.stringify(data)
            };
            
            return fetch(path, requestOptions).then(response => response.json())
        },
        
        postForm: function(_title, _description, _urg, _cat) {
            let data = {
                user: this.auth.currentUser.uid,
                title: _title,
                desc: _description,
                urg: _urg,
                cat: _cat,
                stage: 0,
            }
            
            let key = this.db.ref().child('reports').push().key;
            
            return () => this.db.ref('reports/' + key).set(data)
        }.bind(this),
        
        getForms: async function() {
            let uid = this.auth.currentUser.uid;
            
            let data;
            let ref = this.db.ref("reports");
            await ref.orderByChild("user").equalTo(uid).once("value").then(function (snapshot) {
                data = snapshot.val()
            })
            return data;
        }.bind(this)
        
    }
}

export default Manager;
