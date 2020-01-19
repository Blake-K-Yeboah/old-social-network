import React from 'react';

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import StyleSheet
import './App.css';

// Import React Router Stuff
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Import Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Explore from './components/pages/Explore';
import Users from './components/pages/Users';
import SingleUser from './components/pages/SingleUser';
import UserEdit from './components/pages/UserEdit';
import NotFound from './components/pages/NotFound';
import SingleProject from './components/pages/SingleProject';

const App = () => {
  return (
    <Router>

      <Switch>

        <Route exact path="/" component={Home} />

        <Route exact path="/about" component={About} />

        <Route exact path="/explore" render={props =>
          localStorage.getItem('jwtToken') ? (
            <Explore {...props} />
          ) : (
              <Redirect to="/" />
            )
        } />

        <Route exact path="/users" render={props =>
          localStorage.getItem('jwtToken') ? (
            <Users {...props} />
          ) : (
              <Redirect to="/" />
            )
        } />

        <Route exact path="/user/:id" render={props =>
          localStorage.getItem('jwtToken') ? (
            <SingleUser {...props} />
          ) : (
              <Redirect to="/" />
            )
        } />

        <Route exact path="/user/edit/:id" render={props =>
          localStorage.getItem('jwtToken') ? (
            <UserEdit {...props} />
          ) : (
              <Redirect to="/" />
            )
        } />

        <Route exact path="/project/:id" render={props =>
          localStorage.getItem('jwtToken') ? (
            <SingleProject {...props} />
          ) : (
              <Redirect to="/" />
            )
        } />

        <Route path="*" component={NotFound} />

      </Switch>

    </Router>
  );
}

export default App;
