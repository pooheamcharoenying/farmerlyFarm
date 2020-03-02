import React, { Fragment,useContext } from 'react'
import { Redirect } from 'react-router-dom'
import {GlobalContext} from '../hook/GlobalHook'

export default function AdminRoute (props){
    const GlobalHook =useContext(GlobalContext)

    function RoleCheck (){
        if(GlobalHook.getGlobalToken){
            if(GlobalHook.getGlobalUser && GlobalHook.getGlobalUser.role == "admin"){
                return props.children
            }else{
                return <Redirect to="/" />
            }
        }else{
            return <Redirect to="/" />
        }
    }
return(


    <Fragment>
      {RoleCheck()}
    </Fragment>
)
}