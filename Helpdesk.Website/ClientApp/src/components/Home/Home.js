import React from 'react';
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import * as CONDITIONS from '../../constants/authConditions';

function UserHome(props) {
    return (
        <PageLimit>
            <h1>Hello User!</h1>
        </PageLimit>
    )
}

function AdminHome(props) {
    return (
        <PageLimit>
            <h1>Hello Admin!</h1>
        </PageLimit>
    )
}


function HomeBase(props) {
    return (
        <div>
            {props.isAdmin === true ? <AdminHome/> : <UserHome/> }
        </div>
    )
}

export const Home = withAuth(CONDITIONS.withAnyUser)(HomeBase);
