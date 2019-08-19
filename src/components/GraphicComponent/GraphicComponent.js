import React, { Component } from 'react';
import './GraphicComponent.css';
import Chart from "react-google-charts";
import axios from 'axios';
class GraphicComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // veri buraya çekilecek sonra grafiğe verilecek 
    }
  }

  
  getRequest = () => {  // TIKLANAN HER KAYIT İÇİN ALERT HİSTORYSİNİ ÇEKİP GRAFİĞE YANSITICAK
    axios.get('/api/alerts/${id}') // İD VERİSİNi TABLE DA İTEME TIKLANILDIĞI AN BURAYA PASLANACAK
      .then(res => {
        this.setState({ liste: res.data, isLoading: true })
      });
  }


  render(){
    return <div className="graphComp">
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[ // buraya atılan isteğin cevabı, [kontrolSüresi,Sonuç] şeklinde eklenicek
          ['Freq', 'State'],
          [0, 0],
          [1, 1],
          [2, 0],
          [3, 1]
        
        ]}
        options={{
          hAxis: {
            title: 'Frekans',
          },
          vAxis: {
            title: 'State',
          },
        }}
        rootProps={{ 'data-test': '1' }}
      />
    </div>

  }
}

export default GraphicComponent;