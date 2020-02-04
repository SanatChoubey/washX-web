import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Resuable/Header';
import * as firebase from 'firebase'; 
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
const MainWrapper = styled.div`
  width:100%;
  height:100vh;
  background-color:orange;
  display:flex;
  justify-content:center;
  align-items:center;
`
const CardWrapper = styled.div`
  width:50%;
  min-width:300px;
  height:400px;
  background-color:white;
  padding-top:10px;
  padding-left:10px;
  display:flex;
  flex-direction:column;
  border-radius: 20px;
  box-shadow: 5px 2px 15px rgba(108, 122, 137, 1);

`

function App() {
  const [phonenum, setphonenum] = useState('')
  const [codenum, setcodenum] = useState('')
  const [bool, setbool] = useState(false)
  const [err, seterr] = useState(false)
  useEffect(()=>{
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(window.recaptcha, {
        'size': 'invisible',
        'callback': function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          console.log(response)
        },
        'expired-callback': function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
     });
     window.recaptchaVerifier.render().then(function (widgetId) {
       window.recaptchaWidgetId = widgetId;
     });
    },[]);
  const onSignInSubmit = () => {
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber('+91'+phonenum,appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult)
          window.confirmationResult = confirmationResult;
         setbool(true)

        }).catch(function (error) {
          // Error; SMS not sent
          // ...
          seterr(error)
          console.log(error)
        });

  }
  const ChangeTextfunc = (e) => {
    
    setphonenum(e.target.value);
      
  }
  const verifier = ()=>{
    window.confirmationResult.confirm(codenum).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log(user)
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
      seterr(error)
      console.log(error)
    });
  }
  const addTextcode = (e) => {
    setcodenum(e.target.value)
  }
  return (
    <div >
      <Header></Header>
      
      <MainWrapper >
        <CardWrapper>
            <h2 style = {{marginLeft:'40%'}}>
              Sign in 
            </h2>
            <Input onChange = {ChangeTextfunc} style = {{margin:'10px'}}iconPosition='left' icon='phone' placeholder='Enter Phone Number' />
            {bool?<Input style = {{margin:'10px'}} placeholder = 'Enter Code' onChange ={addTextcode}/>:''}
              <div>{err.message}</div>
            {bool?<Button style={{width:'100px',margin:'10px'}} onClick ={verifier}primary >Send Code</Button>:<Button  onClick = {onSignInSubmit}style={{width:'100px',margin:'10px'}}positive>Login </Button>}
            <div id= 'recaptcha-container'ref= {(ref)=>{window.recaptcha=ref}}></div>
            
        </CardWrapper>
        
      </MainWrapper>
     
    </div>
  );
}

export default App;
