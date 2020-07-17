import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import Manager, {ManagerContext} from "./components/Manager";
import * as ROUTES from "./constants/routes";


export default class App extends Component {

    render () {
        return (
            <ManagerContext.Provider value={new Manager()}>
                <Navigation/>
                <Switch>
                    <Route path={ROUTES.SIGN_IN}>
                        <SignIn/>
                    </Route>
                    <Route path={ROUTES.SIGN_UP}>
                        <SignUp/>
                    </Route>
                    <Route path="" exact={true}>
                        <Home/>
                    </Route>
                </Switch>
            </ManagerContext.Provider>
        );
    }
}
