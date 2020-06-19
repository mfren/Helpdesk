import React from 'react';

const ManagerContext = React.createContext(null);

export const withManager = Component => props => (
    <ManagerContext.Consumer>
        {manager => <Component {...props} manager={manager} />}
    </ManagerContext.Consumer>
);

export default ManagerContext;