import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import store from './store'
import App from './components/app'

const ConnectedApp = connect((state) => {
    return state;
})(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app')
);