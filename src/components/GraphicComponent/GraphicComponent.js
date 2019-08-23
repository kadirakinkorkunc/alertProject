import React, { Component } from 'react';
import './GraphicComponent.css';
import Chart from "react-google-charts";
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from "react-bootstrap";
import Modal from '../../assets/Modal';
class GraphicComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertHistory: []
      // veri buraya çekilecek sonra grafiğe verilecek 
    }
  }

  componentDidMount() {
    this.getGraphs();
    this.interval = setInterval(this.getGraphs, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getGraphs = () => {  
    axios.get(`/api/alerts/${this.props.objectIdFromTable}/history`) 
      .then(res => {
        this.setState({ alertHistory: [["freq", "Alert"]].concat(res.data.map((dataItem) => [dataItem.alertTime, dataItem.success])), isLoading: true })
        console.log("api verisi:", this.state.alertHistory);
      });
  }
  render() {
    return <div className="graphComp">
      <Nav >
        <LinkContainer to="/list">
          <button>Alert List</button>
        </LinkContainer>
      </Nav>
      {console.log(this.state.alertHistory)}

      <Modal>
        <Modal.Header >
          <Modal.Title>
            <strong>{this.props.objectUrlFromTable} </strong> -> {this.props.objectTypeFromTable}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body padding>
          <Chart
            width={'600px'}
            height={'600px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}

            data={this.state.alertHistory}
            options={{
              hAxis: {
                title: 'hour:minute:second',
              },
              vAxis: { title: "State", ticks: [{ v: 0, f: "Fail" }, { v: 1, f: "Success" }] },
            }}
            rootProps={{ 'data-test': '1' }}
          />
        </Modal.Body>
      </Modal>
    </div>

  }
}

export default GraphicComponent;