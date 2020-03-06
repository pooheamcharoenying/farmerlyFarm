import React from 'react';
import Store from "./hook/GlobalHook";
import Router from "./router/Router";

import './App.scss'
import './index.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import Popup from './components/popup/Popup'
function App() {

  return (

    <Store>

      <Popup/>
      <Router/>
     
    </Store>
 
  );
}

export default App;
