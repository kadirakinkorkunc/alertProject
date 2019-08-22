import React, { Component } from 'react';
import './TableComponent.css';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class TableComponent extends Component {

    state = {
        isLoading: true,
        liste: []
    };

    submit = (id) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteItem(id)
            },
            {
              label: 'No',
              onClick: () => console.log("clicked no")
            }
          ]
        });
      };


    componentDidMount = () => {
        return axios.get('/api/alerts')
            .then(res => {
                console.log(res.data);
                this.setState({ liste: res.data, isLoading: true })
                return res.data;
            });

    }

    deleteItem = (id) => {
        axios.delete(`/api/alerts/${id}`)
            .then(res => {
                console.log(res.data);
                // this.setState({liste : res.data, isLoading:true})
            })
        
    }

    // table post atınca bunun tekrar yenilenmesi lazım async belirtince olması gerekmiyor muydu?
    render() {
        return (
            <div>
                <h3 align="center">ALERT LIST</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Request Name</th>
                            <th>Target URL</th>
                            <th>Request Type</th>
                            <th>Freq.</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.liste.map((alertObject) => {
                            return (
                                <tr key={alertObject.reqId}>
                                    <td>
                                        {alertObject.reqName}
                                    </td>
                                    <td>
                                        {alertObject.reqUrl}
                                    </td>
                                    <td>
                                        {alertObject.reqType}
                                    </td>
                                    <td>
                                        {alertObject.reqControlTime}
                                    </td>
                                    <td>
                                        <LinkContainer to={"/edit" + alertObject.reqId}>
                                            <button className="btn btn-primary">Edit</button>
                                        </LinkContainer>
                                    </td>
                                    <td>
                                        
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.submit(alertObject.reqId)}>Delete
                                            </button>
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        );
        // return <Async promiseFn={this.getAlerts}>
        //     {({ data, error, isLoading, reload }) => {
        //         if (isLoading) {
        //             return <div >Loading...</div>
        //         }
        //         if (error) {
        //             return (
        //                 <div >
        //                     <p>{error.toString()}</p>
        //                     <button onClick={reload}>try again</button>
        //                 </div>
        //             )
        //         }
        //         if (data) {
        //             return <div className="tableDiv">
        //                 <List component="nav" aria-label="main mailbox folders">
        //                     {data.map((dataItem) =>
        //                         <ListItem key={dataItem.reqId} onClick={this.showGraph}>
        //                             <LinkContainer to={`/graph/${dataItem.reqId}`}>
        //                                 <Nav.Link>{dataItem.reqName}-{dataItem.reqUrl}</Nav.Link>
        //                             </LinkContainer>
        //                         </ListItem>
        //                     )}
        //                 </List>

        //             </div>
        //         }
        //         return null
        //     }}

        // </Async>
    }
}
export default TableComponent;