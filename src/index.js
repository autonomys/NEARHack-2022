import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
window.Buffer = window.Buffer || require('buffer').Buffer;

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <App />,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
