//create react app
import React from 'react';

//import css
import styles from './LandingPage.module.css';


//import components


function App(){

  return (

    <div className={styles.body}>

      <div className={styles.navbar}>

        
        <img src="https://i.ibb.co/xXPXQP0/logo.png" 
        className={styles.logo}></img>
        

        <div className={styles.navButtons}>

          <a className={styles.navButtonElement} href=''>Home</a>
          <a className={styles.navButtonElement} href=''>About</a>
          <a className={styles.navButtonElement} href=''>Contact Us</a>
          <a className={styles.navButtonElement} href=''>Signup</a>
          <button className={styles.navButtonLoginElement}><a>Login</a></button>

        </div>
 
      </div> 

      <div className={styles.mainContent}>

        <div className={styles.mainContentTextContainer}>

          <h1 className={styles.title}>Fully Managed Cloud & <br></br>Web Hosting</h1>

          <p className={styles.paragraph}>Dedicated resources, full root access, & easy scaling. It’s the virtual private server you’ve been craving</p>

          <button className={styles.mainButton}>Get Started</button>



        </div>


        <img  className={styles.mainContentIllustration} src='https://i.ibb.co/5hFX8nB/illustration.png'></img>

      </div>

    </div>

    
    
      
    )
    

    
}

export default App;