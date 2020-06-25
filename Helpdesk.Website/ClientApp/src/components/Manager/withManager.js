import React, {Component} from "react";
import ManagerContext from "./context";

/*
    Provides the `Manager` class to a Component using `Context.Consumer`.
    Needs to be paired with `ManagerContext` as a global parent.
    This will likely be defined as one of the top level components in `App.js`.
    Should not be called directly, it is used in `withManager` and is used to
    wrap around the `WithManager` to allow access to functions for authentication.
*/
const withManagerBase = Component => props => (
    <ManagerContext.Consumer>
        {manager => <Component {...props} manager={manager} />}
    </ManagerContext.Consumer>
);

/*
    Provides the `Manager` class to a component in the `manager` property
    Provides the current users to components via the `users` property
        These can be accessed from a component using:
        - props.users.currentUser
        - props.users.currentAdmin
*/
const withManager = Component => {
    class WithManager extends React.Component {
        constructor(props) {
            super(props);
            
            // Set the state
            this.state = {
                currentUser: null,
                currentAdmin: null,
            }
        }
        
        componentDidMount() {
            // When the component mounts, we want to create the listeners
            // We dont need to listen when the component isn't on screen
            
            // The `userListener` will change the state when Firebase says so.
            // Not quite sure how this works, lets just call it magic.
            // Anyway, it does (or did), if you/I am reading this, then
            // it's probably gone wrong. Good Luck!
            this.userListener = this.props.manager.userAuth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({currentUser: authUser})    // Change the state
                        : this.setState({currentUser: null});       // Dont change the state
                }
            );
            
            // Same for this one, but it listens on the the Admin Firebase Service
            // rather than the User Service
            this.adminListener = this.props.manager.adminAuth.onAuthStateChanged(
                authAdmin => {
                    authAdmin
                        ? this.setState({currentAdmin: authAdmin})
                        : this.setState({currentAdmin: null});
                }
            )
        }
        
        componentWillUnmount() {
            // When the component is off screen, we no longer need to listen
            // for the state changes. This removes unnecessary processing
            
            this.userListener();    // Remove the listener
            this.adminListener();
        }
        
        render() {
            // We need to pass down any properties given to us
            // `...this.props` is used to do this
            
            // We also need to pass down the users in our current state
            // `users=this.state` is used to do this
            // By doing this, we are tying all components wrapped by
            // us to the state of our component. This means that if we update
            // then all other components will update.
            
            return (
                <Component {...this.props} users={this.state} />
            )
        }
    }
    
    // We need access to the manager, so we wrap ourselves with a context consumer
    return withManagerBase(WithManager);
};

export default withManager;