//create react app
import React from 'react';

//import css
import styles from './SignupPage.module.css';


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
          <a className={styles.navButtonElement} href=''>Sign up</a>
          <button className={styles.navButtonLoginElement}><a>Login</a></button>

        </div>

      </div> 

      
      <div className={styles.mainContainer}>

        <div className={styles.presentationContainer}>

          <h1 className={styles.presentationTitle}>Sign up</h1>

          <h2 className={styles.presentationSubTitle}>To move to the cloud</h2>

          <div className={styles.subContainer}>

            <div className={styles.subSubContainer}>
              
              <p className={styles.subTitle}>If you already have an acount</p>

              <p className={styles.subTitle}>You can Sign in  <a href='/login' className={styles.specialColour}> here !</a></p>
            
            </div>

            

            <img src='https://i.ibb.co/4FWS973/Saly-14.png' className={styles.illustration}></img>


          </div>

          
          



        </div>

        <div className={styles.separator}></div>



        <div className={styles.signUpContainer}>

        <h1 className={styles.signUpContainerTitle}>Sign Up</h1>


          <input className={styles.textInputField} type='text' placeholder='Email'></input>

          <input className={styles.textInputField}  type="password" placeholder='Password'></input>

          <button className={styles.signUpButton} type='submit'>Sign Up</button>

        </div>







      </div>


    </div>

    
    
      
    )
    

    
}

export default App;