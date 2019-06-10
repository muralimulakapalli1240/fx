import React from 'react';
import * as d3 from "d3";
class LIneChart extends React.Component {
    chart = React.createRef();
    flag = false;
    state = { select: "" }
    chartProps = {};
    componentDidMount() {
        const { chart } = this.props
        if (chart.length > 4)
            this.buildChart()

    }
    componentDidUpdate(prevProps) {
        const { chart, selected } = this.props
        if (chart.length > 4)
            if (!this.flag)
                this.buildChart()
            else {
                if (selected !== prevProps.selected) {
                    d3.select('#chart').selectAll('svg').remove();
                    this.buildChart()
                }
                else
                    this.updateChart()
            }

    }
    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(nextProps.chart) !== JSON.stringify(this.props.chart))
            return true
        else
            return false
    }
    updateTicks() {

    }
    updateChart() {
        let margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;
        const { chart, tick } = this.props;
        let max = d3.max(chart, function (d) { return d.close }), min = d3.min(chart, function (d) { return d.close })
        let diff = max - min
        min -= diff;
        max += diff;
        this.chartProps.x.domain([d3.min(chart, function (d) { return d.index }), d3.max(chart, function (d) { return d.index })])
            .range([0, width - 50]);
        this.chartProps.y.domain([min, max])
            .range([height, 0]);
        this.chartProps.svg.transition();
        this.chartProps.svg.select('.line')
            .attr('d', this.chartProps.valueline(chart));
        this.chartProps.svg.select('.x.axis')
            .call(this.chartProps.xAxis.ticks(tick));
        this.chartProps.svg.select('.y.axis')
            .call(this.chartProps.yAxis);
        let _this = this;

        this.chartProps.svg.selectAll('.lineLegend').remove();

        this.chartProps.svg.selectAll(".lineLegend").data(chart)
            .enter().append("g")
            .attr("class", "lineLegend")
            .style('stroke', 'white')
            .attr("x", function (d, i) { return _this.chartProps.x(d.index) })
            .attr("y", function (d) { return _this.chartProps.y(d.close.toFixed(4)) })
            .append("text").text(function (d) { return d.close.toFixed(4); })
            .attr("x", function (d, i) { return _this.chartProps.x(d.index) })
            .attr("y", function (d) { return _this.chartProps.y(d.close.toFixed(4)) - 20 })
    }

    buildChart() {
        this.flag = true
        const { chart, tick } = this.props
        this.chartProps = {};
        let max = d3.max(chart, function (d) { return d.close }), min = d3.min(chart, function (d) { return d.close })
        let diff = max - min
        min -= diff;
        max += diff;
        let margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;
        this.chartProps.x = d3.scaleLinear()
            .domain([d3.min(chart, function (d) { return d.index }), d3.max(chart, function (d) { return d.index })])
            .range([0, width - 50]);
        this.chartProps.y = d3.scaleLinear()
            .domain([min, max])
            .range([height, 0]);
        var xAxis = d3.axisBottom(this.chartProps.x).tickFormat(d => {
            return "t" + d
        }).ticks(tick).tickSize(15).tickSizeInner([-20]).tickSizeOuter([0])
        var yAxis = d3.axisLeft(this.chartProps.y).ticks(5).tickSize(15);
        let _this = this;
        var line = d3.line()
            .x(function (d, i) { return _this.chartProps.x(d.index); })
            .y(function (d) { return _this.chartProps.y(d.close.toFixed(4)); })
        let svg = d3.select(this.chart.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);
        svg.append('path')
            .datum(chart)
            .attr('class', 'line')
            .style('stroke', 'white')
            .style('fill', 'none')
            .attr('d', line)
        svg.selectAll(".lineLegend").data(chart)
            .enter().append("g")
            .attr("class", "lineLegend")
            .style('stroke', 'white')
            .attr("x", function (d, i) { return _this.chartProps.x(d.index) })
            .attr("y", function (d) { return _this.chartProps.y(d.close.toFixed(4)) })
            .append("text").text(function (d) { return d.close.toFixed(4); })
            .attr("x", function (d, i) { return _this.chartProps.x(d.index) })
            .attr("y", function (d) { return _this.chartProps.y(d.close.toFixed(4)) - 20 })
        this.chartProps.svg = svg;
        this.chartProps.valueline = line;
        this.chartProps.xAxis = xAxis;
        this.chartProps.yAxis = yAxis;
    }
    render() {

        return (
            <div className="chart" ref={this.chart}></div>
        );
    }
}
export default LIneChart



