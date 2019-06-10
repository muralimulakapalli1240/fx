import React from 'react';
import Chart from './chart';
import { connect } from 'react-redux';
import {
    getChart1,
    getChart2,
    getChart3,
    getChart4
} from '../actions'
class Stock extends React.Component {
    chart = React.createRef();
    state = { sock1: [], sock2: [], sock3: [], sock4: [] }

    componentDidMount() {
        const { currency } = this.props

    }


    render() {
        const { currency, Chart1,
            Chart2,
            Chart3,
            Chart4 } = this.props
       // console.log(Chart1.Chart)
        return (
            <div className="App">
                {currency.length > 0 ? <React.Fragment>
                    <Chart currency={currency} chart={Chart1.Chart}></Chart>
                </React.Fragment> : ""}

            </div>
        );
    }
}
const mapStateToProps = state => ({
    currency: state.Get_currency,
    Chart1: state.Chart1,
    Chart2: state.Chart2,
    Chart3: state.Chart3,
    Chart4: state.Chart4
})
const mapDispatchToProps = dispatch => ({
    getChart1: (data) => dispatch(getChart1(data)),
    getChart2: (data) => dispatch(getChart2(data)),
    getChart3: (data) => dispatch(getChart3(data)),
    getChart4: (data) => dispatch(getChart4(data)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stock)