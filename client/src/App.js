import React, { Component } from 'react';
import './App.css';

import Home from './HomeComponent';
import Cam from './CamComponent';
import Data from './DataComponent';
import Admin from './AdminComponent';


// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
     
          <div >
            <ul >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cam">Cam</Link></li>
              <li><Link to="/data">Data</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
   
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/data" component={Data} />
            <Route path="/cam" component={Cam} />
            <Route path="/admin" component={Admin} />
            <Route exact path="*" component={Home} />
          </Switch>

          </div>
        
      </Router>
    );
  }
}

export default App;
