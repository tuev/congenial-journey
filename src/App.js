import React from 'react'
import './App.scss'
import AppDndProvider from 'providers/dndProvider'
import WOProvider from 'providers/workoutProvider'

import WOWeek from 'containers/WOWeek'

function App() {
  return (
    <AppDndProvider>
      <WOProvider>
        <div className="App">
          <div className="container">
            <WOWeek />
          </div>
        </div>
      </WOProvider>
    </AppDndProvider>
  )
}

export default App
