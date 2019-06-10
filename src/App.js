import React from 'react';
import * as d3 from "d3";
import './App.css';
const wsUri = "wss://stocksimulator.intuhire.com/";
const websocket = new WebSocket(wsUri);
class App extends React.Component {
  chart = React.createRef();
  state = { sock1: [], sock2: [], sock3: [], sock4: [] }

  componentDidMount() {
    const { data } = [{ id: "t1", data: "1.2825" }, { id: "t2", data: "1.2814" }, { id: "t3", data: "1.2807" }, { id: "t4", data: "1.2876" }, { id: "t5", data: "1.285", },
    { id: "t6", data: "1.2845" }, { id: "t7", data: "1.2824" }, { id: "t8", data: "1.2866" },
    { id: "t9", data: "1.2835" }, { id: "t10", data: "1.2889" }]
    websocket.onopen = function (evt) {
      websocket.send(JSON.stringify({ "currencyPair": "GBPUSD" }))
    };
    websocket.onmessage = (evt) => {
      //  this.setState((state) => ({ sock1: [...state.sock1, evt.data] },() => onPageChanged(paginationData))
      // onOpen(evt)
    };
    websocket.onerror = function (evt) {
      console.log("Error: " + evt)
    };
  }
  updateChart() {
    let _this = this;
    this.formatDate();

    // Scale the range of the data again
    this.chartProps.x.domain(d3.extent(this.marketStatus, function (d) { return d.index }));

    this.chartProps.y.domain([0, d3.max(this.marketStatus, function (d) { return d.close })]);

    // Select the section we want to apply our changes to
    this.chartProps.svg.transition();

    // Make the changes to the line chart
    this.chartProps.svg.select('.line.line1') // update the line
      .attr('d', this.chartProps.valueline(this.marketStatus));



    this.chartProps.svg.select('.x.axis') // update x axis
      .call(this.chartProps.xAxis);

    this.chartProps.svg.select('.y.axis') // update y axis
      .call(this.chartProps.yAxis);
  }

  buildChart() {
    this.chartProps = {};
    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().rangeRound([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(this.chartProps.x).ticks(5).tickSize(15)
    var yAxis = d3.axisLeft(this.chartProps.y);

    let _this = this;

    // Define the line
    var valueline = d3.line()
      .x(function (d) { console.log('Close market'); return _this.chartProps.x(d.index); })
      .y(function (d) { console.log('Close market'); return _this.chartProps.y(d.close); });



    var svg = d3.select(this.refs.chart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    this.chartProps.x.domain(_this.marketStatus.map(function (d) {
      return "t"+d.index;
    })).range([0, width]);



    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('d', valueline(_this.marketStatus));


    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;

    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }
  render() {

    return (
      <div id="chart" className="App" ref={this.chart}>
        {/* {sock1.map((val, index) => <p key={index}>{val}</p>)} */}
      </div>
    );
  }
}

export default App;
