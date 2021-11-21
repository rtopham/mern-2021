//React and Components
import React, { useEffect } from 'react'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { LOGOUT } from './redux/actions/types'
import { loadUser, setLoading } from './redux/actions/users'

//Utils
import setAuthToken from './utils/setAuthToken'
import setPublicAPIKeyHeader from './utils/setPublicAPIKey'

import MyRoutes from './components/routing/MyRoutes'
import MainNavBar from './components/layout/MainNavBar'
import MainContentContainer from './components/layout/MainContentContainer'
import Alert from './components/layout/Alert'

import './App.css'

const App = () => {
  useEffect(() => {
    //set Public API Key Header

    setPublicAPIKeyHeader(process.env.REACT_APP_API_KEY)
  }, [])

  useEffect(() => {
    //check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    if (localStorage.token) {
      store.dispatch(setLoading(true))
      store.dispatch(loadUser())
    } else store.dispatch(setLoading(false))

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return (
    <Provider store={store}>
      <MainNavBar />
      <MainContentContainer>
        <Alert />
        <MyRoutes />
      </MainContentContainer>
    </Provider>
  )
}

export default App
