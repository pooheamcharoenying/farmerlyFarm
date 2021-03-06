import React,{useContext,useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Dashboard from '../pages/Dashboard';
import Teacher from '../pages/Teacher';
import Studio from "../pages/Studio"
import Admin from '../pages/Admin';
import School from '../pages/School'
import SchoolAdmin from '../pages/SchoolAdmin'
import ShoppingCart from '../pages/ShoppingCart'
import Schoolinvite from '../pages/SchoolInvite'

import NoMatch from '../pages/NoMatch';
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

function RouterMain() {

  return (  
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/course/" component={Home}/>
        <Route exact path="/product/:productSlug" component={Product}/>
        <Route exact path="/dashboard/" component={Dashboard}/>
        <Route exact path="/teacher" component={Teacher}/>
        <Route exact path="/teacher/:courseSlug" component={Studio}/>
        <Route exact path="/school" component={ShoppingCart}/>
        <Route exact path="/school/:schoolSlug" component={School}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/schooladmin" component={SchoolAdmin}/>
        <Route exact path="/schoolinvite" component={Home}/>
        <Route exact path="/schoolinvite/:schoolSlug" component={Schoolinvite}/>

        <Route path="*" component={Home} />        
      </Switch>
    </Router>

 
  );
}

export default RouterMain;