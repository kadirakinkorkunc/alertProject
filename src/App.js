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
    </div>
  );
}

export default App;