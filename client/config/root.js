/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/home'
import NotFound from '../components/404'

import Startup from './startup'
import Chat from '../components/chat'
import LoginForm from '../components/login'


const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(s => s.auth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Redirect to={{ pathname: '/private' }} />
    ) : (
        <Component {...props} />
      )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(s => s.auth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  token: PropTypes.string
}

const defaults = {
  location: {
    pathname: ''
  },
  user: null,
  token: ''
}

OnlyAnonymousRoute.propTypes = types
PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults
OnlyAnonymousRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <OnlyAnonymousRoute exact path="/login" component={() => <LoginForm />}/>
            <Route exact path="/" component={() => <LoginForm />} />
            <Route exact path="/dashboard" component={() => <Home />} />
            <PrivateRoute exact path="/private" component={() => <Chat />} />
            <Route component={() => <NotFound />} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
