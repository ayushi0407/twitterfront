import { history } from './history';

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Token ' + user.token , 'Content-Type': 'application/json'  };
    } else {
        return {};
    }
}

export function loginauthHeader() {
    let user = JSON.parse(localStorage.getItem('loginrequest'));

    if (user && user.token) {
        return { 'Authorization': 'Token ' + user.token , 'Content-Type': 'application/json'  };
    } else {
        return {};
    }
}

export function getEmail() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email) {
        return user.email;
    } else {
        return ;
    }
}

export function getInitials() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.first_name && user.last_name) {
        var name = user.first_name[0] +user.last_name[0]
        return name;
    } else {
        return ;
    }
}  
export function logout(){    
    localStorage.removeItem('user');    
    history.push('/');
    window.location.reload(true);
    return {};
}