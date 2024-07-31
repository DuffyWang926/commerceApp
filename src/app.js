import { Component } from 'react'
import { Provider } from 'react-redux'
import './app.scss'

import configStore from "./store";

const store = configStore();

const App = ({ children }) =>{
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
  
}

export default App
