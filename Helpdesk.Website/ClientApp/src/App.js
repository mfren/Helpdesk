import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import './custom.css'
import Manager, {ManagerContext} from "./components/Manager";


export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <ManagerContext.Provider value={new Manager()}>
                <Layout>
                    <Route exact path='/' component={Home} />
                </Layout>
            </ManagerContext.Provider>
        );
    }
}
