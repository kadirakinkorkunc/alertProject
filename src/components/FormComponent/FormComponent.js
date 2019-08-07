import React, { Component } from 'react';
import './FormComponent.css';
import { Form, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class FormComponent extends Component {
    constructor() {
        super();
        this.state = { // state'i alert ve alerthistory olarak dizilere ayır 
            reqName: '',
            reqUrl: '',
            reqType: '',
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

        axios.post('api/alert/new',this.state)
        .then(res => {
            console.log(res);
        })

        // axios.post('api/alert/new/:id/history')
        // .then()
    }


    render() {

        return <div className="formDiv">
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="reqName">
                        <Form.Label>İstek Adı</Form.Label>
                        <Form.Control value={this.state.reqName} name="reqName" type="text" onChange={this.handleChange} placeholder="istek adı" />
                    </Form.Group>

                    <Form.Group controlId="reqURL">
                        <Form.Label>URL</Form.Label>
                        <Form.Control value={this.state.reqURL} name="reqUrl" type="text" onChange={this.handleChange} placeholder="www.abcd.com" />
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
                        <Form.Control value={this.state.reqControlTime} name="reqControlTime" type="text" placeholder="10" onChange={this.handleChange} />
                    </Form.Group>

                    <Button type="submit" variant="primary" size="lg" active>
                        Save
                        </Button>
                </Form>
            </Container>
        </div>
    }
}
export default FormComponent;