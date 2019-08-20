import React, { Component } from 'react';
import './TableComponent.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import Async from 'react-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from "react-bootstrap";
class TableComponent extends Component {



    getAlerts = () => {
        return axios.get('/api/alerts')
            .then(res => {
                console.log(res.data);
                this.setState({ liste: res.data, isLoading: true })
                return res.data;
            });

    }

    // table post atınca bunun tekrar yenilenmesi lazım async belirtince olması gerekmiyor muydu?

    render() {
        return <Async promiseFn={this.getAlerts}>
            {({ data, error, isLoading, reload }) => {
                if (isLoading) {
                    return <div >Loading...</div>
                }
                if (error) {
                    return (
                        <div >
                            <p>{error.toString()}</p>
                            <button onClick={reload}>try again</button>
                        </div>
                    )
                }
                if (data) {
                    return <div className="tableDiv">
                        <List component="nav" aria-label="main mailbox folders">
                            {data.map((dataItem) =>
                                <ListItem key={dataItem.reqId} onClick={this.showGraph}>
                                    <LinkContainer to={`/graph/${dataItem.reqId}`}>
                                        <Nav.Link>{dataItem.reqName}-{dataItem.reqUrl}</Nav.Link>
                                    </LinkContainer>
                                </ListItem>
                            )}
                        </List>

                    </div>
                }
                return null
            }}

        </Async>
    }
}
export default TableComponent;