import React from 'react';
import LIneChart from './chart';
import { connect } from 'react-redux';
import Counter from './counter';
import {
    getChart1,
    getChart2,
    getChart3,
    getChart4,
    ChangeTick
} from '../../actions'
let diff = 10;
class ChartTab extends React.Component {
    chart = React.createRef();
    bool = true;
    color = "";
    DefaultVal = 0;
    default = 0
    state = { selected: "", tick: 5 }
    componentDidMount() {
        const { getchart, currency, index } = this.props;
        this.props[getchart]({ currencyPair: currency[index].currency_name })
        this.setState(() => ({ selected: currency[index].currency_name }))
    }
    handleChange = (event) => {
        const { getchart} = this.props;
        this.setState({ selected: event.target.value },this.props[getchart]({ currencyPair: event.target.value }));

    }
    updateQuantity = (val) => {
        const { index, charttype } = this.props, {tick } = this.props[charttype];
     
        this.props.ChangeTick((tick+val), index)
        
        
    }
    render() {
        const { currency, charttype } = this.props, { Chart,tick } = this.props[charttype], {selected}=this.state;
        if (Chart.length > 0 && Chart.length<=1) {
            this.DefaultVal = Chart[0].close.toFixed(4).toString().split("")
            this.Default = Chart[0].close
            this.bool = false

        }
        let background = { background: 'rgba(230, 0, 0, 1)' }
        if (this.Default > 0  && Chart.length-1 >= tick) {
            let count = Chart.reduce((ack, val) => { return ack + val.close }, 0), color = ""
            diff = (((count / Chart.length) - this.Default) / this.Default) * 100;
            if (diff > 5)
                color = 'rgba(230, 0, 0, 1)'
            else if (diff <= 5 && diff > 0.5) {
                let per = (diff / 4.5) * 100
                if ((per / 100) < .7)
                    per = 70
                color = 'rgba(128, 0, 0, ' + (per / 100).toFixed(1) + ')'
            }
            else if (diff <= 0.5 && diff > -0.5) {
                let per = ((diff / 4.5) * 100) + 100
                if ((per / 100) < .5)
                    per = 50
                color = 'rgba(128, 0, 0, ' + (per / 100).toFixed(1) + ')'
            }
            else if (diff <= -0.5 && diff > -5) {
                let per = ((diff / 4.5) * 100) + 100
                if ((per / 100) < .5)
                    per = 50
                color = 'rgba(50, 117, 55, ' + (per / 100).toFixed(1) + ')'
            }
            else if (diff <= -5) {
                color = 'rgba(50, 228, 64, 1)'
            }
            background = { background: color }
        }

        return (
            <div className="Charttab" style={background}>
                {Chart.length-1 >= tick ? <React.Fragment>
                    <div className="header">
                        <div className="side">
                            <div className="dropdown">
                                <select value={this.state.selected} onChange={this.handleChange}>
                                    {currency.map((val, index) => <option key={index} value={val.currency_name}>{val.currency_name}</option>)}
                                </select>
                            </div>
                            <h1>{diff.toFixed(2)}%</h1>
                        </div>
                        <div className="side">

                            <h1>{this.DefaultVal.map((val, index) => <span key={index}>{val}</span>)}</h1>
                            <Counter ticks={tick} updateQuantity={this.updateQuantity} ></Counter>
                        </div>

                    </div>
                   <LIneChart currency={currency} chart={Chart} tick={tick} selected={selected}></LIneChart>
                </React.Fragment> : <div className="loading">Loading...</div>}
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
    getChart1: (data, tick) => dispatch(getChart1(data, tick)),
    getChart2: (data, tick) => dispatch(getChart2(data, tick)),
    getChart3: (data, tick) => dispatch(getChart3(data, tick)),
    getChart4: (data, tick) => dispatch(getChart4(data, tick)),
    ChangeTick: (tick, index) => dispatch(ChangeTick(tick, index))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartTab)