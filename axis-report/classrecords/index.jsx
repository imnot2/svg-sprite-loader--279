import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import RouterMap from './router/index'
import configureStore from './store/configureStore'

const store = configureStore()

render(
    <Provider store={store}>
        <RouterMap history={hashHistory}></RouterMap>
    </Provider>,
    document.getElementById('root')
)
