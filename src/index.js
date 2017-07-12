import React from 'react'
import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import App from './Router'


const render = () => {
  const root = document.getElementById('root')
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  )
}


if (module.hot) {
  module.hot.accept('./Router', () => { render() })
}

document.addEventListener('DOMContentLoaded', render)
