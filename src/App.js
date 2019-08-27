import React from 'react';
import './App.css';
import TableComponent from './components/TableComponent/TableComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {


  return (
    <div className="App" >
      <Router>
        <Switch>
          <Route exact path='/' component={TableComponent} />
        </Switch>
      </Router>
      {/* FOOTER */}
      <div className="container">
        <hr />
        <div className="text-center center-block">
          <a href="https://www.linkedin.com/in/kadir-akın-korkunç-261043b5/"><i id="social-gp" className="fa fa-linkedin fa-2x social"></i></a>
          <a href="https://www.github.com/kadirakinkorkunc"><i id="social-gp" className="fa fa-github fa-2x social"></i></a>
          <a href="mailto:kadirakinkorkunc@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-2x social"></i></a>
        </div>
        <hr />
      </div>
      {/* FOOTER */}

    </div>
  );
}

export default App;
