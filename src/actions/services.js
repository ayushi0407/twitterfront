import config from '../config';
export const userService = {
    login
};

export function login(email, password) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
        
    };
    console.log(requestOptions.body);
    return fetch(process.env.REACT_APP_BASEURL+`login/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('loginrequest', JSON.stringify(user));

            return user;
        });

}
function handleResponse(response) {
   
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
            }
           
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (data.status == 'fail') {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);   
              
        }
        return data;
    });
}