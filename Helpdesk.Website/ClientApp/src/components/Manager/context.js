import React from 'react';

const ManagerContext = React.createContext(null);

export const withManager = Component => props => (
    <ManagerContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </ManagerContext.Consumer>
);

export default ManagerContext;