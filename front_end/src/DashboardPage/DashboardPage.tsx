import React from 'react';

//import css
import styles from './DashboardPage.module.css';
import search from './assets/search.svg'
import filterIcon from './assets/filter_icon.svg'
import bell from './assets/bell.svg'
import SidePannelButton from './components/sidepannelButton'
import SideButtonsList from './SideButtonsList'
import ScrollContainer from 'react-indiana-drag-scroll'




function App(){

  return (

    <div className={styles.app}>

      <div className={styles.navbar}>

        <img src="https://i.ibb.co/xXPXQP0/logo.png" className={styles.logo}></img>


          
        <div className={styles.searchBar}>

        <img className={styles.searchBarIcon} src={search}></img>

          
          <input className={styles.searchBarInput} type="text" placeholder="Search Files..." name="search"></input>

        </div>

        <button className={styles.filterButton}>
          Filter
          <img className={styles.filterIcon} src={filterIcon}></img>
        </button>

        <div className={styles.userContainer}>

          <button className={styles.notificationsButton}>
            <img className={styles.notificationsButtonIcon} src={bell}></img>
          </button>

          <div className={styles.userInfoContainer}>


            <img className={styles.userProfilePicture}src="https://xsgames.co/randomusers/assets/avatars/male/64.jpg">
            </img>

            <p className={styles.usernameText}>Username</p>

          </div>

        </div>


      </div>

      <div className={styles.divisionHorizontalBar}></div>

      <div className={styles.mainContainer}>

        <div className={styles.sidePannel}>

          <div className={styles.sidePannelButtonsContainer}>

              

            {SideButtonsList.map((item, index) => (
              <SidePannelButton title={item.title} image={item.image}/>
            ))}
    

          </div>


          <div className={styles.storageUsageDetailsContainer}>


            


            <div className={styles.storageUsageTitlesContainer}>

              
              <h1 className={styles.storageUsedTitle}>25.32 GB used</h1>
            
              <h2 className={styles.storageUsedFreeTitle}>72.8% used - 6.64 GB free</h2>
              
            </div>
              
            <div className={styles.storageUsageBackgroundBar}>

              <div className={styles.storageUsageBar}></div>


            </div>



          </div>



        </div>

        <div className={styles.divisionVerticalBar}></div>

        <div className={styles.mainContentContainer}>

          <ScrollContainer className={styles.foldersContainer} hideScrollbars={false}>

            {/* Si besoin de diviser en deux div, utiliser deux listes pour chaque div*/}

              <div className={styles.subFolderContainer}>

                <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>


                </div>

                <div className={styles.subFolderContainer}>

                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  <div className={styles.folderButton}></div>
                  

                
              </div>

            


          </ScrollContainer>

          




        </div>






      </div>


      

      

        






      

      


    </div>

    
    
      
    )
    

    
}

export default App;