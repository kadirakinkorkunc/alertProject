import React, { Component } from 'react';
import './TableComponent.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import GraphicComponent from '../GraphicComponent/GraphicComponent';
import ListItemText from '@material-ui/core/ListItemText';
class TableComponent extends Component {
    state = {
        isLoading: true,
        liste: []
    };

    showGraph() {

    }


    async componentDidMount() {
        axios.get('/api/alerts')
            .then(res => {
                console.log(res.data);
                this.setState({ liste: res.data, isLoading: true })
            });

    }

    // table post atınca bunun tekrar yenilenmesi lazım async belirtince olması gerekmiyor muydu?

    render() {
        const { liste, isLoading } = this.state;
        if (isLoading) {
            return <div className="tableDiv" >
                <List component="nav" aria-label="main mailbox folders">
                    {liste.map((listItem) =>
                        <ListItem key={listItem.reqId} button onClick={this.showGraph}>
                            <ListItemText primary={listItem.reqName} />
                        </ListItem>
                    )}
                </List>
                
            </div>
            
        }
        else {
            return <p>Loading...</p>
        }
    }
}
export default TableComponent;