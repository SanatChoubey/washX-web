import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Product from './components/Product';
import Order from './components/Order';
import Addaddress from './components/Addaddress';
import CartCompo from './components/CartCompo';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import rootReducer from './Redux/reducer/index';
import * as firebase from 'firebase/app';
import { rootSaga } from './Redux/Saga/index';
import 'semantic-ui-css/semantic.min.css';
import { createBrowserHistory } from "history";
var firebaseConfig = {
    apiKey: "AIzaSyC5_kHmwB0lt8A1sknImB4DCm56xOwbTZ4",
    authDomain: "wash-x-f6ad0.firebaseapp.com",
    databaseURL: "https://wash-x-f6ad0.firebaseio.com",
    projectId: "wash-x-f6ad0",
    storageBucket: "wash-x-f6ad0.appspot.com",
    messagingSenderId: "848156856688",
    appId: "1:848156856688:web:e4eda0869c0537e924bfb5",
    measurementId: "G-9G2R0YHPGK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const sagamiddleware = createSagaMiddleware()
const store = createStore( rootReducer, applyMiddleware(sagamiddleware));
 sagamiddleware.run(rootSaga)
 const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route exact path = '/' >
                <App/>
            </Route>
            <Route exact path = '/product' >
                <Product></Product>
            </Route>
            <Route path = '/order'>
                <Order/>
            </Route>
            <Route path = '/cart'>
                <CartCompo/>
            </Route>
            <Route path = '/details'>
                <Addaddress/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
