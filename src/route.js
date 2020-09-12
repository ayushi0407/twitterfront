import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Login = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const LogOutPage = React.lazy(() => import('./Demo/Authentication/SignIn/LogOutPage'));


const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/logout', exact: true, name: 'LogOutPage', component: LogOutPage },
]

export default route;