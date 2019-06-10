import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore ,applyMiddleware} from 'redux'
import rootReducer from './reducers';
import Stock from './components'
import {getAllcurrency_pairs} from './actions'
import thunk from 'redux-thunk';
import './index.css';
const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(getAllcurrency_pairs())
render(
  <Provider store={store}>
    <Stock/>
  </Provider>,
  document.getElementById('root')
)