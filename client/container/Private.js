/**
 * Created by Reinchard on 8/1/2017.
 */
import React, {Component} from 'react';
import {Route, Redirect} from 'react-router';

const authGuard = {
    checkAuth: () => {
        return !!(localStorage.getItem('token'));
    }
}

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        authGuard.checkAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
)