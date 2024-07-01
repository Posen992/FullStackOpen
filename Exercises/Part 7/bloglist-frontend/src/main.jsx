import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)
