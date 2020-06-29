import React from 'react';
import SignIn from "../SignIn";
import {PageLimit} from "../Layouts/PageLimit/PageLimit";
import {withAuthUser} from "../Manager/withAuth";

function HomeBase(props) {
    
    return (
        <PageLimit>
            <h1>Hello World!</h1>
            <SignIn/>
        </PageLimit>
    )
}

export const Home = withAuthUser(HomeBase);
