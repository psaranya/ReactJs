import React from 'react';
import {history} from './history';
import { Router, Route } from 'react-router-dom';
import  loginScreen  from './loginScreen';
import searchscreen from './components/searchscreen';
import planet from './components/planet';
import './App.css';

class App extends React.Component {
 
  render() {
    return (
      <div className="jumbotron"  >
          <div className="container">
              <div className="col-sm-8 col-sm-offset-2">
                  
                  <Router history={history}>
                      <div>
                          <Route exact path="/" component={loginScreen} />
                          <Route path="/search" component={searchscreen} />
                          <Route path="/planet" component={planet} />
                      </div>
                  </Router>
              </div>
          </div>
      </div>
  );
  }
}


export default App;