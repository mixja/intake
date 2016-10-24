import 'jquery-helpers'
import 'jquery-ujs'

import 'babel-polyfill'
import 'bootstrap'
import $ from 'jquery'
import Autocompleter from 'Autocompleter'
import PeopleApp from 'PeopleApp'
import React from 'react'
import ReactDOM from 'react-dom'
import ScreeningsApp from 'ScreeningsApp'
import {Provider} from 'react-redux'
import store from 'configureStore'

const store = configureStore()

function bindReactComponent(Component, containerId) {
  const container = document.getElementById(containerId)
  if (container) {
    const props = $(container).data('props')
    ReactDOM.render(<Component {...props} />, container)
  }
}

$(document).ready(() => {
  bindReactComponent(Autocompleter, 'add-person')
  bindReactComponent(ScreeningsApp, 'screenings-app')
  <Provider store={store}>
    bindReactComponent(PeopleApp, 'people-app')
  </Provider>
})
