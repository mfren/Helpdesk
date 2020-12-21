import React from "react";
import AppCacheContext from "./context";

export const withAppCache = Component => props => (
    <AppCacheContext.Consumer>
        {cache => <Component {...props} cache={cache} />}
    </AppCacheContext.Consumer>
);