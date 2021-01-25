import React from 'react'
import './App.css'
import ToDoList from './Components/ToDoListContainer'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {

  return (
    <Provider store={store}>
      <div className='container-fluid' >
        <ToDoList />
      </div>
    </Provider>
  )
}

export default App
