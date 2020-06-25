import React, { Component } from 'react';
import Manager, {ManagerContext} from "./components/Manager";
import * as ROUTES from "./constants/routes";
import {MaterialSignIn} from "./components/MaterialSignIn/MaterialSignIn";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import {Navigation} from "./components/Navigation/Navigation";


export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <ManagerContext.Provider value={new Manager()}>
                <Navigation/>
                <Switch>
                    <Route path={ROUTES.userSignIn}>
                        <MaterialSignIn admin={false}/>
                    </Route>
                    <Route path={ROUTES.adminSignIn}>
                        <MaterialSignIn admin={true}/>
                    </Route>
                    <Route path="" exact={true}>
                        <Home/>
                    </Route>
                </Switch>
            </ManagerContext.Provider>
        );
    }
}
