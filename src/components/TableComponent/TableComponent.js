import React, { Component } from 'react';
import './TableComponent.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import GraphicComponent from '../GraphicComponent/GraphicComponent';
import ListItemText from '@material-ui/core/ListItemText';
import Async from 'react-async';
class TableComponent extends Component {


    showGraph() {
        // BURDAN TIKLANILAN OBJENİN İD'SİNİ GRAFİK COMPONENT'E AKTAR.
    }


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
                    return <div className="tableDiv">Loading...</div>
                }
                if (error) {
                    return (
                        <div className="tableDiv"> 
                            <p>{error.toString()}</p>
                            <button onClick={reload}>try again</button>
                        </div>
                    )
                }
                if (data) {
                    return <div className="tableDiv">
                        <List component="nav" aria-label="main mailbox folders">
                            {data.map((dataItem) =>
                                <ListItem key={dataItem.reqId} button onClick={this.showGraph}>
                                    <ListItemText primary={dataItem.reqName} />
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