import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import {colors, makeStyles} from "@material-ui/core";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import CreateReport from "./components/CreateReport";
import NoMatch from "./components/NoMatch";
import Manager, {ManagerContext} from "./components/Manager";
import * as ROUTES from "./constants/routes";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    headerContainer: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
    },
    contentContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
    },
    footerContainer: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "40px",
    },
    switch: {
        height: "100%"
    }
}));

export default function App() {
    const classes = useStyles();
    
    return (
        <ManagerContext.Provider value={new Manager()}>
            <div className={classes.mainContainer}>
                <div className={classes.headerContainer}>
                    <Navigation/>
                </div>
                <div className={classes.contentContainer}>
                    <Switch className={classes.switch}>
                        <Route exact path={ROUTES.HOME}>
                            <Home/>
                        </Route>
                        <Route path={ROUTES.SIGN_IN}>
                            <SignIn/>
                        </Route>
                        <Route path={ROUTES.SIGN_UP}>
                            <SignUp/>
                        </Route>
                        <Route path={ROUTES.NEW_REPORT}>
                            <CreateReport/>
                        </Route>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </div>
                <div className={classes.footerContainer}>
                    
                </div>
            </div>
            
        </ManagerContext.Provider>
    );
}
