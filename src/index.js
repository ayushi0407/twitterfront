import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import store  from './store/index';


const app = (
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
                <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
