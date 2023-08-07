import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyC0WzN8b1WZ1BKvYObM_bEOEA7h0NiHmEU",
    authDomain: "cloudapp-b1e10.firebaseapp.com",
    projectId: "cloudapp-b1e10",
    storageBucket: "cloudapp-b1e10.appspot.com",
    messagingSenderId: "306526058417",
    appId: "1:306526058417:web:ca2a5ec2035ec1b6806f90",
    measurementId: "G-G600B1ZV35"
  };

  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');

  const handleSignUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign up successful, do something if needed
        //alert(userCredential);
        alert("Signed up successfuly")
        setIsAuth(true);
      })
      .catch((error) => {
        // Sign up failed, handle the error
        alert(error);
      });
  };
  
  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful, do something if needed
        //alert(userCredential);
        userCredential.user?.getIdToken().then(function(idToken) {
          console.log(idToken);
          setToken(idToken);
          //alert("Token: " + idToken);
        });
        alert("Loged in successfuly")
        setIsAuth(true);

      })
      .catch((error) => {
        // Login failed, handle the error
        alert(error);
      });
  };

  async function checkToken(){
    
    //alert(token);
    if (token){
      const res = await axios.get('http://localhost:5000/api/check', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      alert(res.data.message)

      //console.log(res.data)
    
      
      //alert("Token: " + token);
 
  }
}

  





  //add firebase auth with an email and password to allow users to login and signup 

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to CloudApp</p>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSignUp}>
            Sign Up
          </button>

          <button type="submit" onClick={handleLogin}>
            Log In
          </button>

          <p>{token}</p>
          
          <button type="button" onClick={checkToken}></button>
        </form>
      </header>
    </div>
  );










  
}

export default App;
