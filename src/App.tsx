import React, { useEffect } from 'react'
import './App.css'
import ToDoList from './Components/ToDo/ToDoListContainer'
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd-mobile/dist/antd-mobile.css'
import store, { AppStateType } from './redux/store'
import { Breadcrumb, Layout, Menu, Spin } from 'antd'
import { compose } from 'redux'
import { initializeApp } from './redux/appReducer'
import Header from './Components/Header/Header'
import { isMobile } from "react-device-detect"
import Login from './Components/Login/Login'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const App = (props: MapPropsType & DispatchPropsType) => {
  useEffect(() => {
    if (!props.initialized) {
      console.log('initialized FALSE', props)
      props.initializeApp()
    } else {
      console.log('initialized TRUE', props)
    }
  }, [props.initialized])

  if (!props.initialized) {
    return <Spin key="spin" size="large" />
  }

  return (
    <Layout>
      {/* <li>авторизироваться</li> */}
      <Header />
      <Switch>
        <Route exact path='/'
          render={() => <Redirect to={'/login'} />} />
        <Route path='/login'
          render={() => <Login />} />
        <Route path='/toDoList'
          render={() => <ToDoList />} />
        <Route path='*'
          render={() => <div>404 NOT FOUND</div>} />
      </Switch>
      <Footer>Footer for my app</Footer>
    </Layout>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={isMobile ? "" : "container"}>
          <AppContainer />
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp
