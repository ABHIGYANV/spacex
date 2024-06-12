import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Launches from './pages/Launches';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => (
  <Router>
    <div className="container mx-auto">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/launches" component={Launches} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  </Router>
);

export default App;
