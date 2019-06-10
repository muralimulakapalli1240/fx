import axios from "axios";
export const GET_CHART = "GET_CHART";
export const GET_CHART_START = "GET_CHART_START"
export const GET_CHART_ERROR = "GET_CHART_ERROR"
export const GET_CURRENCY = "GET_CURRENCY"
export const GET_CHART1 = "GET_CHART1"
export const GET_CHART2 = "GET_CHART2"
export const GET_CHART3 = "GET_CHART3"
export const GET_CHART4 = "GET_CHART4"
export const CHANGE_TICK= "CHANGE_TICK"
export const GET_CHART_START4 = "GET_CHART_START4"
export const GET_CHART_ERROR4 = "GET_CHART_ERROR4"
export const GET_CHART_START1 = "GET_CHART_START1"
export const GET_CHART_ERROR1 = "GET_CHART_ERROR1"
export const GET_CHART_START2 = "GET_CHART_START2"
export const GET_CHART_ERROR2 = "GET_CHART_ERROR2"
export const GET_CHART_START3 = "GET_CHART_START3"
export const GET_CHART_ERROR3 = "GET_CHART_ERROR3"
const apiUrl = "https://restsimulator.intuhire.com/currency_pairs"
const wsUri = "wss://stocksimulator.intuhire.com/";
let websocket1 = "", websocket2 = "", websocket3 = "", websocket4 = ""
export const getAllcurrency_pairs = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
      .then(response => {
        dispatch(getcurrency_pairs(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};
const getcurrency_pairs = data => {
  return (dispatch) => {

    dispatch({
      type: 'GET_CURRENCY',
      data
    })
  }

}
export const ChangeTick = (tick,index) =>({
  type: CHANGE_TICK+(index+1),
  tick
})
export const getChart1 = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_CHART_START1,
      undefined
    })
    dispatch({
      type: "EMPTY_CHART1",
      undefined
    })
    if(websocket1)
    websocket1.close()
    websocket1=new WebSocket(wsUri)
    websocket1.onopen = function (evt) {
      websocket1.send(JSON.stringify(data))
    };
    websocket1.onmessage = (evt) => {
      dispatch({
        type: GET_CHART1,
        data: evt.data,
      })
    };
    websocket1.onerror = function (evt) {
      console.log("Error: " + evt)
    };
  }
}
export const getChart2 = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: GET_CHART_START2,
      undefined
    })
    dispatch({
      type: "EMPTY_CHART2",
      undefined
    })
    if(websocket2)
    websocket2.close()
    websocket2=new WebSocket(wsUri)
    websocket2.onopen = function (evt) {
      websocket2.send(JSON.stringify(data))
    };
    websocket2.onmessage = (evt) => {
      dispatch({
        type: GET_CHART2,
        data: evt.data,
        
      })
    };
    websocket2.onerror = function (evt) {
      console.log("Error: " + evt)
    };
  }
}
export const getChart3 = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: GET_CHART_START3,
      undefined
    })
    dispatch({
      type: "EMPTY_CHART3",
      undefined
    })
    if(websocket3)
    websocket3.close()
    websocket3=new WebSocket(wsUri)
    websocket3.onopen = function (evt) {
      websocket3.send(JSON.stringify(data))
    };
    websocket3.onmessage = (evt) => {
      dispatch({
        type: GET_CHART3,
        data: evt.data,
        
      })
    };
    websocket3.onerror = function (evt) {
      console.log("Error: " + evt)
    };
  }
}
export const getChart4 = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: GET_CHART_START4,
      undefined
    })
    dispatch({
      type: "EMPTY_CHART4",
      undefined
    })
    if(websocket4)
    websocket4.close()
    websocket4=new WebSocket(wsUri)
    websocket4.onopen = function (evt) {
      websocket4.send(JSON.stringify(data))
    };
    websocket4.onmessage = (evt) => {
      dispatch({
        type: GET_CHART4,
        data: evt.data,
        
      })
    };
    websocket4.onerror = function (evt) {
      console.log("Error: " + evt)
    };
  }
}