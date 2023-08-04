//create react app
import React, { useState } from 'react';

//import css
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


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
  
  



  function handleLogin(e:any) {
    e.preventDefault(); // Stop the form from submitting
    

    signInWithEmailAndPassword(auth, email, password)
  
      .then((userCredential) => {
        //console.log(userCredentials.user)


        const user = userCredential.user;


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

          <h1 className={styles.presentationTitle}>Sign in</h1>

          <h2 className={styles.presentationSubTitle}>To move to the cloud</h2>

          <div className={styles.subContainer}>

            <div className={styles.subSubContainer}>
              
              <p className={styles.subTitle}>If you don't have an acount</p>

              <p className={styles.subTitle}>You can sign up  <Link to={'/signup'} className={styles.specialColour}> here !</Link></p>
            
            </div>

            

            <img src='https://i.ibb.co/4FWS973/Saly-14.png' className={styles.illustration}></img>


          </div>

          
          



        </div>

        <div className={styles.separator}></div>



        <div className={styles.signInContainer}>

        <h1 className={styles.signInContainerTitle}>Sign in</h1>


          <input className={styles.textInputField} type='text' placeholder='Email'value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <input className={styles.textInputField}  type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

          <button className={styles.loginButton} onClick={(e)=>{handleLogin(e)}}>Login</button>

        </div>







      </div>


    </div>

    
    
      
    )
    

    
}

export default App;