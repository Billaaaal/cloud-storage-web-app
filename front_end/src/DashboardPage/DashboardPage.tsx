import React from 'react';

//import css
import styles from './DashboardPage.module.css';
import search from './assets/search.svg'
import filterIcon from './assets/filter_icon.svg'
import bell from './assets/bell.svg'
import SidePannelButton from './components/sidePannelButton/sidepannelButton'
import SideButtonsList from './SideButtonsList'
import ScrollContainer from 'react-indiana-drag-scroll'
import RecentFilesButton from './components/recentFilesButton/recentFilesButton'
import ElementButton from './components/elementButton/elementButton';
import folderIcon from './assets/folder.svg'
import { Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { FileUploader } from "react-drag-drop-files";


function App(){


  const recentFilesList = [{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},];

  const elementsList = [{elementName: "revenues_folder", type: "folder", size: "28 KB", date: "time-stamp" }, {elementName: "document.docx", type: "docx", size: "54 KB", date: "time-stamp" }, {elementName: "image.jpg", type: "jpg", size: "136 KB", date: "time-stamp" }];

  

  const dropDownMenuOptions = (item:object) => [
    { label: (<div onClick={()=>{downloadItem(item)}}>Download</div>), key: 'download' },
    { label: (<div onClick={()=>{renameItem(item)}}>Rename</div>), key: 'rename' },
    { label: (<div onClick={()=>{deleteItem(item)}}>Delete</div>), key: 'delete' },
  ]

  function downloadItem(item:any){

    console.log(`Downloading ${item.type} ${item.elementName}...`)

  }

  function renameItem(item:any){

    console.log(`Renaming ${item.type} ${item.elementName}...`)

  }

  function deleteItem(item:any){

    console.log(`Deleting ${item.type} ${item.elementName}...`)


  }

    
  

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

      <div className={styles.sidePannel}>

          <div className={styles.sidePannelButtonsContainer}>

              

            {SideButtonsList.map((item, index) => (
              <SidePannelButton itemObject={item}/>



              
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

      <div className={styles.mainContainer}>


        

        <div className={styles.divisionVerticalBar}></div>

        <div className={styles.mainContentContainer}>

          <h1 className={styles.sectionTitle}>Recent files</h1>





          <ScrollContainer className={styles.recentFilesContainer} hideScrollbars={true}>



            {/* Si besoin de diviser en deux div, utiliser deux listes pour chaque div*/}

            

            <div className={styles.subRecentFilesContainer} id={styles.subRecentFilesContainer1}>
            {recentFilesList.map((item, index) => (

              



            <Dropdown trigger={['contextMenu']} menu={{
              items: dropDownMenuOptions(item),
            }} 
            ><div><RecentFilesButton itemObject={item}/></div></Dropdown>


            ))}


            
              
            </div>


          

            


          </ScrollContainer>

          <div id={styles.bottomContainer}>
            <div>

              <h1 className={styles.sectionTitle} style={{marginLeft:'20px'}}>myImages/LosAngeles2023</h1>
              {/*  <h1 className={styles.sectionTitle} style={{marginLeft:'20px'}}>All files</h1> */}


              <div id={styles.allFilesSortContainer}>
                <button className={styles.sortItem}>Type</button>
                <button className={styles.sortItem}>Name</button>
                <button className={styles.sortItem} style={{marginLeft:'135px'}}>Date created</button>
                <button className={styles.sortItem} style={{marginLeft:'40px'}}>Size</button>


              </div>

              <div id={styles.allFilesSubContainer}>

                {elementsList.map((item, index) => (

                

                <Dropdown trigger={['contextMenu']} menu={{
                  items: dropDownMenuOptions(item),
                }}><div><ElementButton itemObject={item}/></div></Dropdown>))}




              </div>

            </div>

            <FileUploader hoverTitle={"Drop here"}>
              <div id={styles.dragDropSurface}>
                <div id={styles.dragDropIconContainer}>

                <img src={"https://cdn-icons-png.flaticon.com/512/2716/2716054.png"} id={styles.dragDropIcon}></img>


                </div>
                <h1 id={styles.dragDropText}>Drag and drop files, or <span id={styles.dragDropBrowseText}>Browse</span></h1>
              </div>
            </FileUploader>




            
          </div>

          

          

            


          

          




        </div>






      </div>


      

      

        






      

      


    </div>

    
    
      
    )
    

    
}

export default App;