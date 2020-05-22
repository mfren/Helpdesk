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
const adminConfig = {
    apiKey: process.env.REACT_APP_API_KEY_ADMIN,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_ADMIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL_ADMIN,
    projectId: process.env.REACT_APP_PROJECT_ID_ADMIN,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_ADMIN,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_ADMIN,
    appId: process.env.REACT_APP_APP_ID_ADMIN,
};

class Manager {
    constructor(props) {
        this.props = props;

        //// Init Firebase ////
        firebase.initializeApp(userConfig);                                          // User Firebase
        const adminFirebase = firebase.initializeApp(adminConfig, "admin");    // Admin Firebase
        
        this.userAuth = firebase.auth();        // User Auth
        this.adminAuth = adminFirebase.auth();  // Admin Auth
    }
    
    // Create User
    _doCreateUser = (authSys, email, password) => authSys.createUserWithEmailAndPassword(email, password);
    createUser  = (email, password) => this._doCreateUser(this.userAuth, email, password);
    createAdmin = (email, password) => this._doCreateUser(this.adminAuth, email, password);
    
    // Sign Out
    _doSignOut = (authSys) => authSys.signOut();
    signUserOut  = () => this._doSignOut(this.userAuth);
    signAdminOut = () => this._doSignOut(this.adminAuth);

    // Password Email Reset
    _doPasswordReset = (authSys, email) => authSys.sendPasswordResetEmail(email);
    userReset  = (email) => this._doPasswordReset(this.userAuth,  email);
    adminReset = (email) => this._doPasswordReset(this.adminAuth, email);
    
    // Password Update (Disabled for Security Reasons)
    // _doPasswordUpdate = (authSys, password) => authSys.updatePassword(password);
    // userUpdate  = (password) => this._doPasswordUpdate(this.userAuth,  password);
    // adminUpdate = (password) => this._doPasswordUpdate(this.adminAuth, password);
    
    //// Requests ////
    request = {
        
        // Post Data to Backend
        post: (admin, path, data) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin': admin
                },
                body: JSON.stringify(data)
            };

            let responseData;
            fetch(path, requestOptions)
                .then(response => response.json())
                .then(jsonData => responseData = jsonData);
            
            return responseData
        },
        
        // Post Form
        postForm: (title, description, rank, cat, subCat) => {
            
            // Create data structure
            const data = {
                "title": title,
                "description": description,
                "rank": rank,
                "cat": cat,
                "sub-cat": subCat
            }
            
            // Determine whether we are admin
            let admin;
            if (this.userAuth.currentUser) {
                // Post as User
                admin = false;
            }
            else if (this.adminAuth.currentUser) {
                // Post as Admin
                admin = true
            }
            else {
                // No current user
                return false
            }

            // Post data
            this.request.post(admin, ROUTES.formPost, data)
            return true
        },
    }
}

export default Manager;
