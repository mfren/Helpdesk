import React from "react";
import ManagerContext from "./context";
import * as ROLES from '../../constants/roles';

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
    Provides the current user to components via the `user` property
        The user's roles can be accessed using `props.user.roles`
    Provides a bool to determine whether the current user is an admin via the `isAdmin`
*/
const withManager = Component => {
    class WithManager extends React.Component {
        constructor(props) {
            super(props);
            
            // Set the state
            this.state = {
                user: null,
                admin: null,
            }
        }

        componentDidMount() {
            this.listener = this.props.manager.onAuthUserListener(
                authUser => {
                    this.setState({ user: authUser, admin: authUser.roles[ROLES.ADMIN] });
                },
                () => {
                    this.setState({ user: null, admin: null });
                },
            );
        }

        componentWillUnmount() {
            this.listener();
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
                <Component {...this.props} user={this.state.user} isAdmin={this.state.admin}/>
            )
        }
    }
    
    // We need access to the manager, so we wrap ourselves with a context consumer
    return withManagerBase(WithManager);
};

export default withManager;