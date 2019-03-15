import React from 'react';
import ReactDOM from 'react-dom';
import "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import App from './App';
import { HashRouter, Route, Switch } from 'react-router-dom';


const routing = (
    <HashRouter>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
            </Switch>
        </div>
    </HashRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
