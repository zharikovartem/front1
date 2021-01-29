import React, { useEffect, useState } from 'react'
import './App.css'
import ToDoList from './Components/ToDo/ToDoListContainer'
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter, useLocation } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd-mobile/dist/antd-mobile.css'
import store, { AppStateType } from './redux/store'
import { Breadcrumb, Layout, Menu, Spin } from 'antd'
import { compose } from 'redux'
import { initializeApp, addLocation } from './redux/appReducer'
import Header from './Components/Header/HeaderContainer'
import { isMobile } from "react-device-detect"
import Login from './Components/Login/Login'
import Orders from './Components/Orders/OrdersContainer'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void,
  addLocation: (location: string) => void
}

const App = (props: MapPropsType & DispatchPropsType) => {
  const [location, setLocation] = useState(useLocation().pathname)
  useEffect(() => {
    if (!props.initialized) {
      console.log('location', location)
      if (location === '/front1/') {
        props.addLocation(location)
      }
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
        <Route exact path={props.appLocation}
          render={() => <Redirect to={props.appLocation+'login'} />} />

        <Route path={props.appLocation+'login'}
          render={() => <Login />} />

        {/* {isAuth ? 
          <Route path={props.appLocation+'toDoList'} 
            render={() => <ToDoList />} />

          <Route path={props.appLocation+'orders'} 
            render={() => <Orders />} />
        :
          null
        } */}
        
         <Route path={props.appLocation+'toDoList'} 
            render={() => <ToDoList />} />

          <Route path={props.appLocation+'orders'} 
            render={() => <Orders />} />

        <Route path={props.appLocation+'*'}
          render={() => <div>404 NOT FOUND</div>} />
      </Switch>
      {/* <Footer>Footer for my app</Footer> */}
    </Layout>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  appLocation: state.app.location,
  isAuth: state.auth.isAuth
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp, addLocation }))(App)

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
