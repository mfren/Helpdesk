import React from 'react';
import PageLimit from "../Layouts/PageLimit";
import {withAuth} from "../Manager/withAuth";
import * as CONDITIONS from '../../constants/authConditions.js';

function HomeBase(props) {
    return (
        <PageLimit>
            <h1>Hello World!</h1>
        </PageLimit>
    )
}

export const Home = withAuth(CONDITIONS.withAnyUser)(HomeBase);
