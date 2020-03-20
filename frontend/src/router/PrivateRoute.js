import React, { Fragment,useContext, useState,useEffect } from 'react'
import {Route, Redirect } from 'react-router-dom'
import {GlobalContext} from '../hook/GlobalHook'
import Firebase from "../hook/firebase";
export default function AdminRoute ({component: Component, ...rest}){
    const GlobalHook = useContext(GlobalContext)
    const [getReadyStatus,setReadyStatus] = useState(false)
    const [getGlobalCurrentUser, setGlobalCurrentUser] = useState();
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)
    useEffect(() => {
      Firebase.auth().onAuthStateChanged(setGlobalCurrentUser);
    }, []);

    function isInitialized() {
		return new Promise(resolve => {
			Firebase.auth.onAuthStateChanged(resolve)
		})
    }
    
    function UUI() {
		return new Promise(resolve => {
			GlobalHook.getGlobalUser = resolve
		})
	}

    useEffect(() => {
		isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})
    
  
    useEffect(() => {
      console.log(GlobalHook.getGlobalUserAuth)
      console.log(getGlobalCurrentUser)
      console.log(firebaseInitialized)
    }, );

    
    if(firebaseInitialized  ){
      
                return(
                    <Route {...rest} render={props => (
                        firebaseInitialized  ?
                            <Component {...props} />
                        : <Redirect to="/" />
                    )} />
                )
        

        
        //return(<div>Done Wait</div>)
    }else{
        return(<div>Loading</div>)

    }


 



    // function RoleCheck (){
        
    //     if(GlobalHook.getGlobalToken){
    //         setReadyStatus(true)
    //         if(GlobalHook.getGlobalUser && GlobalHook.getGlobalUser.role == "admin"){
    //             return props.children
    //         }else{
    //             return <Redirect to="/" />
    //         }
    //     }
    // }

    // async function CalState(){
    //     const gg = await Firebase.auth().onAuthStateChanged()
    //     return gg
    // }
    // if(getGlobalCurrentUser == undefined){
    //     // return (<Redirect to="/" />)

    //     return(<div>undefined</div>)
    // }else{
    //     if(GlobalHook.getGlobalUser){
    //         console.log("notNull")

    //         // if(GlobalHook.getGlobalUser.role == "admin"){
    //         //     return props.children
    //         // }else{
    //         //     return <Redirect to="/" />
    //         // }
    //         return(<div>notNull</div>)
    //     }else{
    //         console.log("issnull")
    //         return(<div>issnull</div>)
    //     }
        
    // }

    // if(getReadyStatus){
    //     return(
    //         RoleCheck()
    //     )
    // }else{
    //     return(
    //         // <Redirect to="/" />
    //         RoleCheck()
    //     )  
    // }

    // if(GlobalHook.getGlobalUser){
    //     return props.children
    // }else{
        
    // }

   // return(<div>55</div>)


  
}