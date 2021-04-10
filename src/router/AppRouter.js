import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminPage from '../pages/MainPage'

export function AppRouter() {

    return (
        <>
            <Switch>
                <Route path={`/user-cabinet`} component={AdminPage}/>
            </Switch>
        </>
    )
}