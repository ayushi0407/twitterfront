import { ADD_ARTICLE,userConstants,Security_DATA_LOADED } from "../constants/index";
import { userService } from './services';
import { alertActions } from './alertActions';
import {history} from "./../helper/history"

export function login(username, password) {
    return dispatch => {

        userService.login(username, password)
            .then(
                user => { 
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.removeItem('loginrequest');                  
                    window.location.reload(true);
                    
                },
                error => {
                        console.log(error.toString());
                        dispatch(alertActions.error(error.toString()));
                }
            );
    };

}
 