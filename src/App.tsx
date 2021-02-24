import React, { useEffect, useState } from 'react'
import ToDoList from './Components/ToDo/ToDoContainer'
import { BrowserRouter, Redirect, Route, Switch, withRouter, useLocation } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import './App.css'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd-mobile/dist/antd-mobile.css'
import store, { AppStateType } from './redux/store'
import { Layout, Spin } from 'antd'
import { compose } from 'redux'
import { initializeApp, addLocation } from './redux/appReducer'
import { credsType, login } from './redux/authReducer'
import Header from './Components/Header/HeaderContainer'
import { isMobile } from "react-device-detect"
import Login from './Components/Login/LoginContainer'
import Orders from './Components/Orders/OrdersContainer'
import TasksTree from './Components/TasksTree/TasksTreeContainer'
import Register from './Components/Register/RegisterContainer'
import Users from './Components/Users/UsersContainer'
import CurrentUser from './Components/Users/CurrentUser/CurrentUserContainer'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void,
  addLocation: (location: string) => void,
  login: (data: credsType) => void,
}

const App = (props: MapPropsType & DispatchPropsType) => {
  const [location, setLocation] = useState(useLocation().pathname)

  useEffect(() => {
    if (!props.initialized) {
      let instanseCreds = parseQueryString()
      if (instanseCreds.email && instanseCreds.password) {
        instanseCreds.remember = true
        props.login(instanseCreds)
      }

      if (location === '/front1/') {
        props.addLocation(location)
        setLocation(location)
      }
      props.initializeApp()
    }
  }, [props, location])


  if (!props.initialized) {
    return <Spin key="spin" size="large" />
  }

  return (
    <Layout>
      <Header />
      <Switch>
        {!props.isAuth ?
          <Route exact path={props.appLocation}
            render={() => <Redirect to={props.appLocation + 'login'} />} />
          :
          <Route exact path={props.appLocation}
            render={() => <Redirect to={props.appLocation + 'toDoList'} />} />
        }

        {props.isAuth ?
          <Route exact path={props.appLocation + 'login'}
            render={() => <Redirect to={props.appLocation + 'toDoList'} />}
          />
          :
          null
        }

        <Route path={props.appLocation + 'login'}
          render={() => <Login />} />

        <Route path={props.appLocation + 'toDoList'}
          render={() => <ToDoList />} />

        <Route path={props.appLocation + 'tasksTree'}
          render={() => <TasksTree />} />

        <Route path={props.appLocation + 'orders'}
          render={() => <Orders />} />

        <Route path={props.appLocation + 'register'}
          render={() => <Register />} />



        {props.userStatus === 'admin' || props.userStatus === 'superAdmin' ?
          <>

          <Route path={props.appLocation + 'users/:userId'} component={CurrentUser} />

          <Route exact path={props.appLocation + 'users'}
            render={() => <Users />} />

          </>
          :
          null
        }


        <Route path={props.appLocation + '*'}
          render={() => <div>404 NOT FOUND</div>} />
      </Switch>
    </Layout>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  appLocation: state.app.location,
  isAuth: state.auth.isAuth,
  userStatus: state.auth.user?.status
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp, addLocation, login }))(App)

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

const parseQueryString = (): any => {
  const params: any = {}
  document.location.search.substr(1).split('&').forEach((pair) => {
    const [key, value] = pair.split('=')
    params[key] = value
  })
  return params;
};
