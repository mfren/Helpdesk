import React from 'react';
import {withManager} from "../Manager";


function SignInBase(props) {
    
    const manager = props.manager
    
    // Component States
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [errored, setErrored] = React.useState("")

    // Changes state
    const handle = (setFunc, event) => {
        setFunc(event.target.value);
    };

    const handleUser = (event) => handle(setUser, event);
    const handlePass = (event) => handle(setPass, event);
    
    const handleSubmit = event => {
        // Sign In
        manager.signUserIn(user, pass)
            .then(() => setErrored("Logged In"))
            .catch(error => {
                // Lets try the admin system
                manager.signAdminIn(user, pass)
                    .then(() => setErrored("Admin Logged In"))
                    .catch(subError => {
                        setErrored("Login Error");
                        console.error(subError)
                        console.error(error)
                    })
            })
        
        event.preventDefault();
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    User:
                    <input type="text" value={user} onChange={handleUser}/>
                </label>
                <label>
                    Password:
                    <input type="text" value={pass}  onChange={handlePass}/>
                </label>
                <label>
                    
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <h2>{errored}</h2>
            
            {(manager.currentUser() || manager.currentAdmin()) ? (
                <h3>Welcome</h3>
            ) : (
                <h3>You are not logged in!</h3>
            )}
            
        </div>
    )
}

export const SignIn = withManager(SignInBase);