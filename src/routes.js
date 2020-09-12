import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const home = React.lazy(() => import('./Demo/Home/index'));

const routes = [
    { path: '/home', exact:true, name: 'home', component: home },
];

export default routes;