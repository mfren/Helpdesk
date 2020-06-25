import React, {Component} from "react";
import ManagerContext from "./context";

const withManagerBase = Component => props => (
    <ManagerContext.Consumer>
        {manager => <Component {...props} manager={manager} />}
    </ManagerContext.Consumer>
);

const withManager = Component => {
    class WithManager extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                currentUser: null,
                currentAdmin: null,
            }
        }
        
        componentDidMount() {
            this.userListener = this.props.manager.userAuth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({currentUser: authUser})
                        : this.setState({currentUser: null});
                }
            );
            
            this.adminListener = this.props.manager.adminAuth.onAuthStateChanged(
                authAdmin => {
                    authAdmin
                        ? this.setState({currentAdmin: authAdmin})
                        : this.setState({currentAdmin: null});
                }
            )
        }
        
        componentWillUnmount() {
            this.userListener();
            this.adminListener();
        }
        
        render() {
            return (
                <Component {...this.props} users={this.state} />
            )
        }
    }
    return withManagerBase(WithManager);
};

export default withManager;