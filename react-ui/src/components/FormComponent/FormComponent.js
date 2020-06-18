import React, { Component } from 'react';
import './FormComponent.css';
import { Form, Container } from 'react-bootstrap';
import { Button } from '../../assets/Buttons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../assets/Modal';

toast.configure()

class FormComponent extends Component {
    constructor() {
        super();
        this.state = { // state'i alert ve alerthistory olarak dizilere ayır 
            reqName: '',
            reqUrl: '',
            reqType: 'GET',
            reqControlTime: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmitState:",this.state);
        axios.post('api/alerts', this.state)
            .then(res => {
                if (res.data === "basariyla eklendi!") {
                    this.props.refreshTable();
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

        return <Modal onClose={() => this.props.closeFormTable()}>
            <Modal.Body>
                <Container>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group controlId="reqName">
                            <Form.Label>İstek Adı</Form.Label>
                            <Form.Control required value={this.state.reqName} name="reqName" type="text" onChange={this.handleChange} placeholder="istek adı" />
                        </Form.Group>

                        <Form.Group controlId="reqURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control required value={this.state.reqURL} name="reqUrl" type="text" onChange={this.handleChange} placeholder="www.abcd.com" />
                        </Form.Group>

                        <Form.Group controlId="reqType">
                            <Form.Label>Request Type</Form.Label>
                            <Form.Control name="reqType" type="text" value={this.state.reqType} as="select" onChange={this.handleChange}>
                                <option defaultValue="selected">GET</option>
                                <option>POST</option>
                                <option>DELETE</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="reqControlTime">
                            <Form.Label>Kontrol Sıklığı(sn)</Form.Label>
                            <Form.Control required value={this.state.reqControlTime} name="reqControlTime" type="text" placeholder="10" onChange={this.handleChange} />
                        </Form.Group>

                        <Button type="submit" btnStyle="primary" size="m" active>
                            Save
                        </Button>
                        <Button
                            btnStyle="default" size="m"
                            onClick={() => this.props.closeFormTable()}
                        >
                            Close
                        </Button>
                    </Form>

                </Container>
            </Modal.Body>
        </Modal>
    }
}
export default FormComponent;