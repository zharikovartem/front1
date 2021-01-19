import React from 'react'
import './App.css'
import ToDoList from './Components/ToDoListContainer'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import store from './redux/store';

const App = (props: any) => {

  return (
    <Provider store={store}>
      <div className="container">
        <ToDoList />
      </div>
    </Provider>
  )
}

export default App
