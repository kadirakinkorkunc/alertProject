import React, { Component } from 'react';
import './GraphicComponent.css';
import Chart from "react-google-charts";
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button'
import { Nav } from "react-bootstrap";
class GraphicComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertHistory: []
      // veri buraya çekilecek sonra grafiğe verilecek 
    }
  }


  componentDidMount = () => {  // TIKLANAN HER KAYIT İÇİN ALERT HİSTORYSİNİ ÇEKİP GRAFİĞE YANSITICAK
    axios.get(`/api/alerts/${this.props.match.params.id}/history`) // İD VERİSİNi TABLE DA İTEME TIKLANILDIĞI AN BURAYA PASLANACAK
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
      <Chart
        width={'900px'}
        height={'600px'}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}

        data={this.state.alertHistory}
        options={{
          hAxis: {
            title: 'Saniye',
          },
          vAxis: {
            title: 'State(1 means succesfull)',
          },
        }}
        rootProps={{ 'data-test': '1' }}
      />
    </div>

  }
}

export default GraphicComponent;