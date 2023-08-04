//create react app
import React, { useState } from 'react';

//import css
import styles from './SignupPage.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, getIdToken } from 'firebase/auth';
import { create } from 'domain';



//import components


function App(){

  const navigate = useNavigate()



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      //alert(uid)
      //then navigate to the dashboard
      // ...
      navigate('/dashboard')
    } else {
      // User is signed out
      // ...

      //lert("You are not signed in")

    }
  });



  function createUserInDB(idToken:String){


    
    // Replace these values with your actual API endpoint and data
  

  // Fetch API POST request











  fetch(
    'http://localhost:5000/api/create-user', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
    }
     // Convert the data to JSON format
  })
  .then(response => {
    if (!response.ok) {
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    //alert(data);
    console.log(data.message)
    // Do something with the response data here
  })




  }
  



  function handleSignup(e:any) {
    e.preventDefault(); // Stop the form from submitting
    

    createUserWithEmailAndPassword(auth, email, password)
  
      .then((userCredential) => {


        const user = userCredential.user;

        const uid = user.uid;

        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          //alert(idToken)



          createUserInDB(idToken)


        }).catch(function(error) {
          // Handle error
        });
        
  

      //createUserInDB()

        //use that uid to make an api call to the backend to create a user in the database and also the files folder

        //maybe also use a token or something like that


      //!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!
      //navigate('/dashboard')


        //not good
        //userCredentials.user?.getIdToken().then(function(idToken) {
         // alert(userCredentials.user.email)
          //console.log(idToken);
          //setToken(idToken);
          //setIsAuth(true);
          
          //navigate("/dashboard", {state:{userCredentials:userCredentials}})
          
          //make an api call to the backend to create a user in the database and also the files folder
          //alert("Token: " + idToken);

        console.log(userCredential.user)  
        //});
      
        // Sign up successful, do something if needed
        //alert(userCredential);
        //alert("Signed up successfuly")
        
      })
      .catch((error) => {
        // Sign up failed, handle the error
        alert(error);
      });
 
  }

  

  return (

    <div className={styles.body}>

      <div className={styles.navbar}>

              
        <img src="https://i.ibb.co/xXPXQP0/logo.png" 
        className={styles.logo}></img>


        <div className={styles.navButtons}>
          
          <Link className={styles.navButtonElement} to={'/'}>Home</Link>
          <Link className={styles.navButtonElement} to={''}>About</Link>
          <Link className={styles.navButtonElement} to={''}>Contact Us</Link>
          <Link className={styles.navButtonElement} to={'/signup'}>Sign Up</Link>
          <button className={styles.navButtonLoginElement} onClick={()=>{navigate("/login")}}><a>Login</a></button>

        </div>

      </div> 

      
      <div className={styles.mainContainer}>

        <div className={styles.presentationContainer}>

          <h1 className={styles.presentationTitle}>Sign up</h1>

          <h2 className={styles.presentationSubTitle}>To move to the cloud</h2>

          <div className={styles.subContainer}>

            <div className={styles.subSubContainer}>
              
              <p className={styles.subTitle}>If you already have an acount</p>

              <p className={styles.subTitle}>You can sign in  <Link to={'/login'} className={styles.specialColour}> here !</Link></p>
            
            </div>

            

            <img src='https://i.ibb.co/4FWS973/Saly-14.png' className={styles.illustration}></img>


          </div>

          
          



        </div>

        <div className={styles.separator}></div>



        <div className={styles.signUpContainer}>

          <h1 className={styles.signUpContainerTitle}>Sign Up</h1>


          <input className={styles.textInputField} type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <input className={styles.textInputField}  type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

          <button className={styles.signUpButton} onClick={(e)=>{handleSignup(e)}}>Sign Up</button>

        </div>







      </div>


    </div>

    
    
      
    )
    

    
}

export default App;