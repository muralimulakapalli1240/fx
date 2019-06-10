import {
    GET_CHART_START4,
    GET_CHART_ERROR4,
    GET_CHART_START1,
    GET_CHART_ERROR1,
    GET_CHART_START2,
    GET_CHART_ERROR2,
    GET_CHART_START3,
    GET_CHART_ERROR3,
    GET_CURRENCY,
    GET_CHART1,
    GET_CHART2,
    GET_CHART3,
    GET_CHART4,
} from '../actions'
const allCHART1 = {
    loading: false,
    avg: 0,
    count: 0,
    Chart: [],
    error: null,
    tick: 5
};
const allCHART2 = {
    loading: false,
    avg: 0,
    count: 0,
    Chart: [],
    error: null,
    tick: 5
};
const allCHART3 = {
    loading: false,
    avg: 0,
    count: 0,
    Chart: [],
    error: null,
    tick: 5
};
const allCHART4 = {
    loading: false,
    avg: 0,
    count: 0,
    Chart: [],
    error: null,
    tick: 5
};
let index1 = -1, index2 = -1, index3 = -1, index4 = -1;
const currency = []
export const Get_currency = (state = currency, action) => {
    switch (action.type) {
        case GET_CURRENCY: {
            return [...action.data]
        }
        default:
            return state
    }
}
export const Chart1 = (state = allCHART1, action) => {

    switch (action.type) {
        case GET_CHART_START1:
            return {
                ...state,
                loading: true
            }
        case "EMPTY_CHART1":
            return {
                ...state,
                avg: 0,
                count: 0,
                Chart: [],
            }
        case "CHANGE_TICK1": {
            return {
                ...state,
                tick: action.tick
            }
        }
        case GET_CHART_ERROR1: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case GET_CHART1: {
            const chart = [...state.Chart]
            index1++
            if (chart.length > state.tick)
                chart.shift()
            let c = 0;
            if (index1 > 0)
                c = state.avg / index1
            return {
                ...state,
                loading: false,
                avg: state.avg + parseFloat(action.data),
                count: c,

                Chart: [...chart, { index: index1, close: parseFloat(action.data) }],
            }
        }
        default:
            return state
    }
}
export const Chart2 = (state = allCHART2, action) => {

    switch (action.type) {
        case GET_CHART_START2:
            return {
                ...state,
                loading: true
            }
        case "EMPTY_CHART2":
            return {
                ...state,
                avg: 0,
                count: 0,
                Chart: [],
            }
        case GET_CHART_ERROR2: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case "CHANGE_TICK2": {
            return {
                ...state,
                tick: action.tick
            }
        }
        case GET_CHART2: {
            const chart = [...state.Chart]
            index2++
            if (chart.length > state.tick)
                chart.shift()
            let c = 0;
            if (index2 > 0)
                c = state.avg / index2
            return {
                ...state,
                loading: false, avg: state.avg + parseFloat(action.data),
                count: c,

                Chart: [...chart, { index: index2, close: parseFloat(action.data) }],
            }
        }
        default:
            return state
    }
}
export const Chart3 = (state = allCHART3, action) => {

    switch (action.type) {
        case GET_CHART_START3:
            return {
                ...state,
                loading: true
            }
        case "EMPTY_CHART3":
            return {
                ...state,
                avg: 0,
                count: 0,
                Chart: [],
            }
        case GET_CHART_ERROR3: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case "CHANGE_TICK3": {
            return {
                ...state,
                tick: action.tick
            }
        }
        case GET_CHART3: {
            const chart = [...state.Chart]
            index3++
            if (chart.length > state.tick)
                chart.shift()
            let c = 0;
            if (index3 > 0)
                c = state.avg / index3
            return {
                ...state,
                loading: false, avg: state.avg + parseFloat(action.data),
                count: c,

                Chart: [...chart, { index: index3, close: parseFloat(action.data) }],
            }
        }
        default:
            return state
    }
}
export const Chart4 = (state = allCHART4, action) => {

    switch (action.type) {
        case GET_CHART_START4:
            return {
                ...state,
                loading: true
            }
        case "EMPTY_CHART4":
            return {
                ...state,
                avg: 0,
                count: 0,
                Chart: [],
            }
        case GET_CHART_ERROR4: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case "CHANGE_TICK4": {
            return {
                ...state,
                tick: action.tick
            }
        }
        case GET_CHART4: {
            const chart = [...state.Chart]
            index4++
            if (chart.length > state.tick)
                chart.shift()
            let c = 0;
            if (index4 > 0)
                c = state.avg / index2
            return {
                ...state,
                loading: false, avg: state.avg + parseFloat(action.data),
                count: c,

                Chart: [...chart, { index: index4, close: parseFloat(action.data) }],
            }
        }
        default:
            return state
    }
}
