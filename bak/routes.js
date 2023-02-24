import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Admin from './pages/Admin';
import Question from './pages/Question';
import Login from './pages/Login';
import CreateQuestion from './pages/CreateQuestion';
import Signup from './pages/Signup';

const BaseRouter = (props) => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/question/:id" component={Question} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/create-question" component={CreateQuestion} />
        <Route exact path="/admin" component={Admin} />
    </Switch>
);

export default BaseRouter;
