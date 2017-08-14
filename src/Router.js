import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Child from './pages/schedule'

export default function App() {
  return (
    <Router>
      <div>
        <Route exact path="/components" component={Home} />
      </div>
    </Router>
  )
}
