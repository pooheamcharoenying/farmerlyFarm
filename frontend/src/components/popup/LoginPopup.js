import React, { useContext, useState,useEffect } from "react";
import {
  Input,
  Button,
  Icon,
  Modal,
  Tabs,
  Checkbox,
  
} from "antd";
import {FaFacebook,FaLine} from 'react-icons/fa'
import { GlobalContext } from "../../hook/GlobalHook";
import { LoginAction, SignUpAction,ResetPassAction } from "../../actions";
const LogInModal = () => {
  const GlobalHook = useContext(GlobalContext);

  const [getUserEmail, setUserEmail] = useState("");
  const [getUserName, setUserName] = useState("");

  const [getUserPassword, setUserPassword] = useState("");
  const [getUserPassword2, setUserPassword2] = useState("");


  const { TabPane } = Tabs;

  useEffect(() => {
    setUserEmail("")
    setUserName("")
    setUserPassword("")
    setUserPassword2("")
  }, []);

  function handleLoginAction() {
    setUserEmail("")
    setUserName("")
    setUserPassword("")
    setUserPassword2("")
    console.log('startLoginAction')
    console.log(getUserEmail)
    console.log(getUserPassword)
    LoginAction(GlobalHook, { email: getUserEmail, password: getUserPassword },"userpass");
   
  }

  function handleSignupAction() {
    setUserEmail("")
    setUserName("")
    setUserPassword("")
    setUserPassword2("")
    SignUpAction(GlobalHook, {
      email: getUserEmail,
      password: getUserPassword,
      password2: getUserPassword2,
      name: getUserName
    });
  
  }
  return (
    <Modal
      visible={GlobalHook.getGlobalShowLoginModal}
      onOk={() => GlobalHook.setGlobalShowLoginModal(false)}
      onCancel={() => GlobalHook.setGlobalShowLoginModal(false)}
      footer={null}
      style={{ maxWidth: "300px" }}
    >
      <Tabs
        defaultActiveKey="Login"
        activeKey={GlobalHook.getGlobalLoginTab}
        onChange={e => GlobalHook.setGlobalLoginTab(e)}
        on
        style={{ maxWidth: "300px" }}
      >
        <TabPane tab="Login" key="Login" className="flex flex-col">
          <div
            className="flex flex-col"
            onKeyPress={event => {
              if (event.key === "Enter") {
                handleLoginAction();
              }
            }}
          >
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              className="mb-4"
              type="email"
              onChange={e => setUserEmail(e.target.value)}
            />
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              className="mb-6"
              onChange={e => setUserPassword(e.target.value)}
            />
            <div className="mb-2">
              <Checkbox onChange={() => {}}>Remember me</Checkbox>
            </div>

            <Button
              type="primary"
              className="mb-4"
              onClick={() => handleLoginAction()}
            >
              Log in
            </Button>
            <div className="flex">
              {" "}
              Don't have an account?
              <div
                className="ml-2 underline hover:text-blue-500 cursor-pointer"
                onClick={() => GlobalHook.setGlobalLoginTab("Signup")}

              >
                Sign up!
              </div>
            </div>
            <div className="flex mt-2">
             
              <div
                className="hover:text-blue-500 cursor-pointer text-gray-700"
                onClick={() => GlobalHook.setGlobalLoginTab("forgotPass")}

              >
               Forgot password ?
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
             <div className="border-b-2 border-gray-200" style={{minWidth:"100%"}}>
            
             </div>
             
              <div className="flex mt-2">
              <FaFacebook className="text-blue-600 hover:text-blue-500 cursor-pointer mr-4" style={{fontSize:"35px"}} onClick={()=>LoginAction(GlobalHook,null,"facebook")}/>
              <Icon type="google-circle" theme="filled" className="text-red-600  hover:text-red-500 cursor-pointer mr-4" style={{fontSize:"35px"}}  onClick={()=>LoginAction(GlobalHook,null,"google")}/>
              <Icon type="twitter-circle" theme="filled" className="text-blue-400 hover:text-blue-300 cursor-pointer" style={{fontSize:"35px"}}  onClick={()=>LoginAction(GlobalHook,null,"twitter")}/>
              
              </div>
             
            </div>
          </div>
        </TabPane>
        <TabPane tab="Signup" key="Signup" className="flex flex-col">
          <div
            className="flex flex-col"
            onKeyPress={event => {
              if (event.key === "Enter") {
                handleSignupAction();
              }
            }}
          >
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              className="mb-4"
              onChange={e => setUserName(e.target.value)}
            />
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              className="mb-4"
              type="email"
              onChange={e => setUserEmail(e.target.value)}
            />
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              className="mb-6"
              onChange={e => setUserPassword(e.target.value)}
            />
              <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Confirm Password"
              className="mb-6"
              onChange={e => setUserPassword2(e.target.value)}
            />

            <Button
              type="primary"
              className="mb-2"
              onClick={() => handleSignupAction()}
            >
              Sign up
            </Button>
            <div className="flex flex-col items-center mt-4">
             <div className="border-b-2 border-gray-200" style={{minWidth:"100%"}}>
            
             </div>
             
             <div className="flex mt-2">
              <FaFacebook className="text-blue-600 hover:text-blue-500 cursor-pointer mr-4" style={{fontSize:"35px"}} onClick={()=>LoginAction(GlobalHook,null,"facebook")}/>
              <Icon type="google-circle" theme="filled" className="text-red-600  hover:text-red-500 cursor-pointer mr-4" style={{fontSize:"35px"}}  onClick={()=>LoginAction(GlobalHook,null,"google")}/>
              <Icon type="twitter-circle" theme="filled" className="text-blue-400 hover:text-blue-300 cursor-pointer" style={{fontSize:"35px"}}  onClick={()=>LoginAction(GlobalHook,null,"twitter")}/>
              
              </div>
             
            </div>
          </div>
        </TabPane>
        <TabPane  key="forgotPass" className="flex flex-col">
          <div
            className="flex flex-col items-center"
            onKeyPress={event => {
              if (event.key === "Enter") {
                ResetPassAction(GlobalHook,getUserEmail);
              }
            }}
          >
          <div className="text-center">Please enter your email to request a password reset.</div>
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              className="mb-4 mt-4"
              type="email"
              onChange={e => setUserEmail(e.target.value)}
            />
           

            <Button
              type="primary"
              className="mb-2"
              onClick={() => { ResetPassAction(GlobalHook,getUserEmail)}}
            >
              Submit
            </Button>
            <div className="flex flex-col items-center mt-4">
             <div className="border-b-2 border-gray-200" style={{minWidth:"100%"}}>
            
             </div>
             
      
             
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default LogInModal;
