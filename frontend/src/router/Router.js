import React,{useContext,useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import Home from '../pages/Home';
import Course from '../pages/Course';
import Setting from '../pages/Setting';
import Teacher from '../pages/Teacher';
import Studio from "../pages/Studio"
import Admin from '../pages/Admin';
import NoMatch from '../pages/NoMatch';
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

function RouterMain() {

  return (  
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/course/" component={Home}/>
        <Route exact path="/course/:courseSlug" component={Course}/>
        <Route exact path="/setting/" component={Setting}/>
        <Route exact path="/teacher" component={Teacher}/>
        <Route exact path="/teacher/:courseSlug" component={Studio}/>
        <Route exact path="/admin" component={Admin}/>
        <Route path="*" component={Home} />
      </Switch>
    </Router>
 
  );
}

export default RouterMain;