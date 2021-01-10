import React from 'react'
import './App.css'
import ToDoList from './Components/ToDoList'
import 'antd/dist/antd.css'

const App = (props: any) => {

  return(
    <div className="container">
      <ToDoList />
    </div>
  )
}

export default App
