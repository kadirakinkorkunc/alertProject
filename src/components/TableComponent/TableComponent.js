import React, { Component } from 'react';
import './TableComponent.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditTable from './EditTable.js';
import GraphicComponent from '../GraphicComponent/GraphicComponent';
import FormComponent from '../FormComponent/FormComponent';
import { Button } from '../../assets/Buttons';

class TableComponent extends Component {

    state = {
        isLoading: true,
        liste: [],
        displayEditForm: false,
        displayGraph: false,
        displayCreateForm: false,
        reqId: null,
        reqUrl: null,
        reqType: null

    };


    deleteConfirmScreen = (id) => {
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

    deleteItem = (id) => {
        axios.delete(`/api/alerts/${id}`)
            .then(res => {
            })
        this.setState({
            liste: this.state.liste.filter(function (item) {
                return item.reqId !== id
            })
        });
        // databaseden silip, daha sonra stateden o itemi bulup siliyorum.
    }

    componentDidMount = () => {
        this.getAlerts();
    }

    getAlerts = () => {
        axios.get('/api/alerts')
            .then(res => {
                console.log("tableGet", res.data);
                this.setState({ liste: res.data, isLoading: true })
            });
    }

    openEditTable = (id) => {
        this.setState({ displayEditForm: true, reqId: id });
    }

    closeEditTable = () => {
        this.setState({ displayEditForm: false, reqId: null });
    }
    openGraph = (id, url, type) => {
        this.setState({ displayGraph: true, reqId: id, reqUrl: url, reqType: type })
    }
    closeGraph = () => {
        this.setState({ displayGraph: false, reqId: null, reqUrl: null, reqType: null })
    }
    popupAddFormOpen = () => {
        this.setState({ displayCreateForm: true })
    }
    popupAddFormClose = () => {
        this.setState({ displayCreateForm: false })
    }

    render() {
        return (
            <div>
                <h3 align="center"><Button onClick={() => this.popupAddFormOpen()} btnStyle="primary">Create New</Button></h3>
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
                                        <Button btnStyle="primary" onClick={() => this.openEditTable(alertObject.reqId)}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button
                                            btnStyle="border"
                                            onClick={() => this.openGraph(alertObject.reqId, alertObject.reqUrl, alertObject.reqType)}>Graph</Button>
                                    </td>
                                    <td>
                                        <Button
                                            btnStyle="danger"
                                            onClick={() => this.deleteConfirmScreen(alertObject.reqId)}>Delete</Button>
                                    </td>
                                </tr>);
                        })}

                    </tbody>
                </table>

                <div>{
                    this.state.displayEditForm ? <EditTable
                        objectIdFromTable={this.state.reqId}
                        closeEditTable={this.closeEditTable}
                        saveEditTable={this.getAlerts}
                    >
                    </EditTable> : ''}
                </div>

                <div>{
                    this.state.displayGraph ? <GraphicComponent
                        objectIdFromTable={this.state.reqId}
                        objectUrlFromTable={this.state.reqUrl}
                        objectTypeFromTable={this.state.reqType}
                        closeGraph={this.closeGraph}>

                    </GraphicComponent> : ''}
                </div>

                <div>{
                    this.state.displayCreateForm ? <FormComponent
                        closeFormTable={this.popupAddFormClose}
                        refreshTable={this.getAlerts}
                    ></FormComponent> : ''}
                </div>
            </div>
        );
    }
}
export default TableComponent;