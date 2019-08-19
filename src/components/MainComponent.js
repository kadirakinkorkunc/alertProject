import React, { Component } from 'react';
import './MainComponent.css';
import FormComponent from './FormComponent/FormComponent';
import TableComponent from './TableComponent/TableComponent';
import GraphicComponent from './GraphicComponent/GraphicComponent';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class MainComponent extends Component {
    render() {

        return <Router>
            <div>

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">AlertProject</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Add Alert</Nav.Link>
                        <Nav.Link href="/list">Alert List</Nav.Link>
                    </Nav>
                </Navbar>

                <Switch>
                    <Route exact path='/' component={FormComponent} />
                    <Route path='/list' component={TableComponent} />
                    <Route path='/graph/:id' component={GraphicComponent} />
                </Switch>
            </div>
        </Router>
    }
}
export default MainComponent;