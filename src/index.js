import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'
// import myLogger from './middlewares/myLogger'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk, logger)))
// const store = createStore(rootReducer, composeWithDevTools())
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}> {/* 리액트 컴포넌트 어디에서든 store를 사용할 수 있음 */}
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
