import React, { Component } from 'react';
import './GraphicComponent.css';
import Chart from "react-apexcharts";
import axios from 'axios';
class GraphicComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [30, 60, 90, 120, 150] // freq gelcek
        }
      },
      series: [
        {
          name: "x", // name'e url gelicek
          data: [0, 0, 0, 1, 0, 1] // fail or success verisi gelicek
        }
      ]
    };
  }

  async componentDidMount() { // tabledan iteme tıklanılınca buraya JSON verisi gelicek bu tetiklenicek mi ?
    // axios.get('/api/alert/show/${id}')
    // .then(res => {
    //     this.setState({ liste: res.data, isLoading: true })
    // });
  }
  refreshData(){
     axios.get('/api/alert/show/${id}')
    .then(res => {
        this.setState({ liste: res.data, isLoading: true })
    });
  }
  

  render() {
    return <div className="graphComp">
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        width="500"
      />
    </div>

  }
}

export default GraphicComponent;