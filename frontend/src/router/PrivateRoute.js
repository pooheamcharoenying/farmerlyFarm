import React, { Fragment,useContext,useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import {Route,Redirect} from 'react-router-dom';
import {GlobalContext} from '../hook/GlobalHook'

async function PrivateRoute ({ component: Component, ...rest }) {  

    const  getToken = await Cookies.get('globalToken');

    return(
        <div>hhjhh</div>
    )
    }
    

  export default PrivateRoute
// import { Redirect } from 'react-router-dom'
// import {GlobalContext} from '../hook/GlobalHook'

// export default function PrivateRoute ({component:Component},props){
    // const GlobalHook =useContext(GlobalContext)
    // const [getTokenReady,setTokenReady] = useState(false)
    // useEffect(() => {
    //  if(GlobalHook.getGlobalToken){
    //     setTokenReady(true)
    //  }
    // }, [GlobalHook.getGlobalToken])
//     if(getTokenReady){

// return(



//     <>
//         {true ?   <Component {...props} />: <Redirect to="/" /> }
//     </>
// )}else{
//     return <div/>
// }

// }