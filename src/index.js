import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Store from './store/store';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Provider store = {Store}> 
                    <BrowserRouter>
                       <Route path="/" component={App}> </Route>
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
