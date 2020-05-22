import React from 'react';
import {withManager} from "../Manager";

function HomeBase(props) {
    
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    )
}

export const Home = withManager(HomeBase);