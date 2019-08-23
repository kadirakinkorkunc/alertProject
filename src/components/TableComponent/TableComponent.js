import React, { Component } from 'react';
import './TableComponent.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditTable from './EditTable.js';
import GraphicComponent from '../GraphicComponent/GraphicComponent';
import FormComponent from '../FormComponent/FormComponent';

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
            })
        this.setState({
            liste: this.state.liste.filter(function (item) {
                return item.reqId !== id
            })
        });
        // databaseden silip, daha sonra stateden o itemi bulup siliyorum.
    }

    popupForm = (id) => {
        this.setState({ displayEditForm: !this.state.displayEditForm, reqId: id })
    }

    graphPopUp = (id, url, type) => {
        this.setState({ displayGraph: !this.state.displayGraph, reqId: id, reqUrl: url, reqType: type })
    }
    popupAddForm = () => {
        this.setState({ displayCreateForm: !this.state.displayCreateForm })
    }

    render() {
        return (
            <div>
                <h3 align="center"><button onClick={() => this.popupAddForm()} className="btn btn-success">Create New</button></h3>
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
                                        <button className="btn btn-primary" onClick={() => this.popupForm(alertObject.reqId)}>EDIT</button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.submit(alertObject.reqId)}>Delete</button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.graphPopUp(alertObject.reqId, alertObject.reqUrl, alertObject.reqType)}>Graph</button>
                                    </td>
                                </tr>);
                        })}

                    </tbody>
                </table>

                <div>{
                    this.state.displayEditForm ? <EditTable
                        objectIdFromTable={this.state.reqId}>
                    </EditTable> : ''}
                </div>

                <div>{
                    this.state.displayGraph ? <GraphicComponent
                        objectIdFromTable={this.state.reqId}
                        objectUrlFromTable={this.state.reqUrl}
                        objectTypeFromTable={this.state.reqType}>
                    </GraphicComponent> : ''}
                </div>

                <div>{
                    this.state.displayCreateForm ? <FormComponent></FormComponent> : ''}
                </div>
            </div>
        );
    }
}
export default TableComponent;