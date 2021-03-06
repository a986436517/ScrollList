import React from 'react';
import ReactDOM from 'react-dom';
import './style/conmon.less'
import RouterMap from './RouterMap';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import configStore from './conpoment/store'

const store=configStore()

ReactDOM.render(
    <Provider store={store}>
    <RouterMap/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
