//create react app
import React from 'react';

//import css
import styles from './LoginPage.module.css';


//import components


function App(){

  return (

    <div className={styles.body}>

      <div className={styles.navbar}>

              
        <img src="https://i.ibb.co/xXPXQP0/logo.png" 
        className={styles.logo}></img>


        <div className={styles.navButtons}>

          <a className={styles.navButtonElement} href='http://localhost:3000/'>Home</a>
          <a className={styles.navButtonElement} href=''>About</a>
          <a className={styles.navButtonElement} href=''>Contact Us</a>
          <a className={styles.navButtonElement} href=''>Sign Up</a>
          <button className={styles.navButtonLoginElement}><a>Login</a></button>

        </div>

      </div> 

      
      <div className={styles.mainContainer}>

        <div className={styles.presentationContainer}>

          <h1 className={styles.presentationTitle}>Sign in</h1>

          <h2 className={styles.presentationSubTitle}>To move to the cloud</h2>

          <div className={styles.subContainer}>

            <div className={styles.subSubContainer}>
              
              <p className={styles.subTitle}>If you don't have an acount</p>

              <p className={styles.subTitle}>You can Register  <a href='' className={styles.specialColour}> here !</a></p>
            
            </div>

            

            <img src='https://i.ibb.co/4FWS973/Saly-14.png' className={styles.illustration}></img>


          </div>

          
          



        </div>

        <div className={styles.separator}></div>



        <div className={styles.signInContainer}>

        <h1 className={styles.signInContainerTitle}>Sign in</h1>


          <input className={styles.textInputField} type='text' placeholder='Email'></input>

          <input className={styles.textInputField}  type="password" placeholder='Password'></input>

          <button className={styles.loginButton} type='submit'>Login</button>

        </div>







      </div>


    </div>

    
    
      
    )
    

    
}

export default App;