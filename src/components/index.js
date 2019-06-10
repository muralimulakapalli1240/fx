import React from 'react';
import ChartTab from './chart/ChartTab';
import { connect } from 'react-redux';
class Stock extends React.Component {
    chart = React.createRef();
    render() {
        const { currency } = this.props
        return (
            <div className="App">
                {currency.length > 0 ? <React.Fragment>
                    <ChartTab currency={currency} charttype={"Chart1"} getchart={"getChart1"} index={0}></ChartTab>
                    <ChartTab currency={currency} charttype={"Chart2"} getchart={"getChart2"} index={1}></ChartTab>
                    <ChartTab currency={currency} charttype={"Chart3"} getchart={"getChart3"} index={2}></ChartTab>
                    <ChartTab currency={currency} charttype={"Chart4"} getchart={"getChart4"} index={3}></ChartTab>
                </React.Fragment> : ""}

            </div>
        );
    }
}
const mapStateToProps = state => ({
    currency: state.Get_currency
})

export default connect(
    mapStateToProps
)(Stock)