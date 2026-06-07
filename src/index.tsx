import React from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'flatpickr/dist/flatpickr.min.css'
import './styles/theme.scss'

import App from 'components/app/App'
import createStore from './store/store'

const { store, persistor } = createStore()

const root = createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
)
