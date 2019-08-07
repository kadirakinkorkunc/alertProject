import React, { Component } from 'react';
import './MainComponent.css';
import FormComponent from './FormComponent/FormComponent';
import TableComponent from './TableComponent/TableComponent';
import GraphicComponent from './GraphicComponent/GraphicComponent';
class MainComponent extends Component {

    render() {

        return <div>
            <FormComponent></FormComponent>
            <TableComponent></TableComponent>
            <GraphicComponent></GraphicComponent>
        </div>
    }
}
export default MainComponent;