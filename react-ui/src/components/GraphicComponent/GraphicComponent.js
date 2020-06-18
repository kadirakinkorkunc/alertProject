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
        this.setState({ alertHistory: [["time", "latency", "state"]].concat(res.data.map((dataItem) => [dataItem.alertTime, dataItem.alertLatency, dataItem.success])), isLoading: true })
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

      <Modal onClose={() => this.props.closeGraph()}>
        <Modal.Header>
          <Modal.Title>
            <strong>{this.props.objectUrlFromTable} </strong> -> {this.props.objectTypeFromTable}
            <br></br>200=Succesfull,100=Failed
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
                title: 'Request Time(hour:minute:second)',
              },
              vAxis: { title: "Response Time(ms)" },
              series: {
                1: { curveType: 'function' },
              },
            }}
            rootProps={{ 'data-test': '1' }}
          />


        </Modal.Body>
      </Modal>
    </div>

  }
}

export default GraphicComponent;