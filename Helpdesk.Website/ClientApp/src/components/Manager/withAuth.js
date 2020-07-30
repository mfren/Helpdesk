import React from "react";
import {withRouter} from "react-router-dom";
import withManager from "./withManager";
import * as ROUTES from '../../constants/routes'

export const withAuth = condition => Component => {
    class WithAuth extends React.Component {
        constructor(props) {
            super(props);
            
            this.state = { clear: false };
        }
        
        componentDidMount() {
            this.listener = this.props.manager.onAuthUserListener(
                authUser => {                    
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN)
                    }
                    else {
                        this.setState({ clear: true })
                    }
                },
                () => this.props.history.push(ROUTES.SIGN_IN)
            );
        }
        
        componentWillUnmount() {
            this.listener();
        }

        render() {
            if (this.state.clear) {
                return (
                    <Component {...this.props}/>
                )
            } else {
                return (
                    <div/>
                )
            }
        }
    }
    return withRouter(withManager(WithAuth))
}
