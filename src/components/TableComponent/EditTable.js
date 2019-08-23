import React, { Component } from 'react';
import Modal from '../../assets/Modal';
import { Button } from '../../assets/Buttons';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';


class EditTable extends Component {
    constructor() {
        super();
        this.state = {
            liste: {},
            showModal: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name, event) {
        let liste = this.state.liste;
        liste[name] = event.target.value;
        console.log(liste);
        console.log(name);
        console.log(event.target.value);
        this.setState({ liste: liste });
    }

    componentDidMount() {
        axios.get(`/api/alerts/${this.props.objectIdFromTable}`)
            .then(res => {
                this.setState({ liste: res.data, isLoading: true })
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("savelist:", this.state)
        axios.post('/api/alerts', this.state.liste)
            .then(res => {
                if (res.data === "basariyla eklendi!") {
                    toast.success('Alert added!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                } else {
                    toast.danger('Failed!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            })
    }



    render() {
        return (
            <Modal>
                <Modal.Header >
                    <Modal.Title>
                        Request Edit
                </Modal.Title>
                </Modal.Header>
                <Modal.Body padding>
                    <Form onSubmit={this.handleSubmit} >
                        {/* <input type="hidden" name="reqId" value={this.state.liste.reqId} />  */}
                        <Form.Group controlId="reqName">
                            <Form.Label>İstek Adı</Form.Label>
                            <Form.Control required value={this.state.liste.reqName} name="reqName" type="text" onChange={(e) => this.handleChange("reqName", e)} placeholder="istek adı" />
                        </Form.Group>

                        <Form.Group controlId="reqURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control required value={this.state.liste.reqUrl} name="reqUrl" type="text" onChange={(e) => this.handleChange("reqUrl", e)} placeholder="www.abcd.com" />
                        </Form.Group>

                        <Form.Group controlId="reqType">
                            <Form.Label>Request Type</Form.Label>
                            <Form.Control name="reqType" type="text" value={this.state.liste.reqType} as="select" onChange={(e) => this.handleChange("reqType", e)}>
                                <option defaultValue="selected">GET</option>
                                <option>POST</option>
                                <option>DELETE</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="reqControlTime">
                            <Form.Label>Kontrol Sıklığı(sn)</Form.Label>
                            <Form.Control required value={this.state.liste.reqControlTime} name="reqControlTime" type="text" placeholder="10" onChange={(e) => this.handleChange("reqControlTime", e)} />
                        </Form.Group>
                        <Button
                            btnStyle="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            btnStyle="default"
                        >
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal >
        )
    }
}
export default EditTable;