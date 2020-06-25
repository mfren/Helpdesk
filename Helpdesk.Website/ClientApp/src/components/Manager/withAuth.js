import React from "react";
import * as ROUTES from '../../constants/routes'
import withManager from "./withManager";
import {withRouter} from "react-router-dom";

const withAuthBase = (adminNeeded, Component) => {
    class WithAuth extends React.Component {
        componentDidMount() {
            if (adminNeeded) {
                if (!this.props.users.currentAdmin) {
                    this.props.history.push(ROUTES.adminSignIn)
                }
            } else {
                if (!(this.props.users.currentUser || this.props.users.currentAdmin)) {
                    this.props.history.push(ROUTES.userSignIn)
                }
            }
        }
        
        render() {
            return (
                <Component {...this.props}/>
            )
        }
    }
    return withRouter(withManager(WithAuth))
}

export const withAuthAdmin = (component) => withAuthBase(true, component);
export const withAuthUser = (component) => withAuthBase(false, component);