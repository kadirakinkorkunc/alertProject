import React, { Component } from 'react';
import './MainComponent.css';
import FormComponent from './FormComponent/FormComponent';
import TableComponent from './TableComponent/TableComponent';
import GraphicComponent from './GraphicComponent/GraphicComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

class MainComponent extends Component {



    biMetod() {
        //ilk post atıldıktan sonra burda sürekli alertHistory'ye belirtilen sürede tekrar edecek şekilde
        // bi' metod yazılmalı.Bu metod tüm alertlerin alerthistorysini sürekli güncelleyebilmeli
        //  arkada sürekli çalışmalı

        // kaydedilen her alert kendi id'si ile buraya belirtilen süre tekrarında uğramalı ve 
        //historysine yeni veri çekmeli
    }


    render() {

        return <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand >
                        <Link to="/">
                            AlertProject
                        </Link>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Add Alert</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/list">
                            <Nav.Link>Alert List</Nav.Link>
                        </LinkContainer>
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