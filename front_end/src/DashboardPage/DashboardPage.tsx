import React, {useEffect, useRef} from 'react'
//import css
import styles from './DashboardPage.module.css';
import search from './assets/search.svg'
import filterIcon from './assets/filter_icon.svg'
import logOutIcon from './assets/logOutIcon.svg'
import SidePannelButton from './components/sidePannelButton/sidepannelButton'
import SideButtonsList from './SideButtonsList'
import ScrollContainer from 'react-indiana-drag-scroll'
import RecentFilesButton from './components/recentFilesButton/recentFilesButton'
import ElementButton from './components/elementButton/elementButton';
//import folderIcon from './assets/folder.svg'
//import { Dropdown, Menu } from 'antd';
//import type { MenuProps } from 'antd';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import DragDropSuccessfullAnimation from './components/dragDropSuccessfullAnimation/dragDropSuccessfullAnimation';
import UploadedFileItem from './components/uploadedFileItem/uploadedFileItem';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';
//haha
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import RenameModal from './components/renameModal/renameModal';
import addIcon from './assets/addIcon.svg'
import NewFolderModal from './components/newFolderModal/newFolderModal';
import { get, getDatabase, onValue, ref } from 'firebase/database';



function App(){

  const firebaseConfig = {

  apiKey: "AIzaSyC0WzN8b1WZ1BKvYObM_bEOEA7h0NiHmEU",

  authDomain: "cloudapp-b1e10.firebaseapp.com",

  databaseURL: "https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "cloudapp-b1e10",

  storageBucket: "cloudapp-b1e10.appspot.com",

  messagingSenderId: "306526058417",

  appId: "1:306526058417:web:ca2a5ec2035ec1b6806f90",

  measurementId: "G-G600B1ZV35"

  };



  
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const auth = getAuth();




  





  const navigate = useNavigate()

  function signOutFromFirebase(){
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/login')
    });
  }

  //alert("Listening even from the dashboard")


  const [currentUserEmail, setCurrentUserEmail] = useState<String |null>("")

  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any | null>("")

  const [currentPath, setCurrentPath] = useState("/My Files/Work 2023/")

  const [currentIdToken, setCurrentIdToken] = useState("")

  const [newFolderModalIsOpen, setNewFolderModalIsOpen] = useState(false);



  
  useEffect(() => {

    console.log("This is supposed to run once")



    const unsubscribe = onAuthStateChanged(auth, (user) => {
      

      
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        //alert(user.email)
        setCurrentUserEmail(user.email)

        
        


        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          //alert(idToken)

          listenToDatabaseChanges()
          


          setCurrentIdToken(idToken)


        }).catch(function(error) {

          


          // Handle error
        });




        //alert(uid)
        //then navigate to the dashboard
        // ...a
        //console.log("You are signed in")
      } else {
        // User is signed out
        // ...
  
        //alert("You are not signed in")
        navigate('/login')
  
      }
    });


    
    return () => {
      
      unsubscribe()
      
      // Clean up side effects or subscriptions here when the component unmounts
    };



  },

  
  
  
  []);

  function listenToDatabaseChanges(){

    

    console.log("Listening to changes in the database " + "users/" + auth.currentUser?.uid)
   // console.log("Listening to changes in the database: " +  "/users/"+user.uid+'/My Files/' )
    //

    const db = getDatabase();
    

    const tasksRef = ref(db, "users/" + auth.currentUser?.uid);

        
    get(tasksRef)
    .then((snapshot) => {

      console.log("There have been changes")

      const data = snapshot.val();
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
    


  }
  
  
  
  

  

  //fetch(`http://127.0.0.1:5000/api/check`)
  //.then(res => res.json())
  //.then((res: any) => {
      // res is now an Actor

  //    alert(res.message)
      
  //});

  

  const recentFilesList = [{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},];

  const elementsList = [{elementName: "a folder", type: "folder", size: "28 KB", date: "time-stamp" },{elementName: "another one", type: "folder", size: "28 KB", date: "time-stamp" },{elementName: "lol", type: "folder", size: "28 KB", date: "time-stamp" },{elementName: "revenues_folder", type: "folder", size: "28 KB", date: "time-stamp" },{elementName: "revenues_folder", type: "folder", size: "28 KB", date: "time-stamp" },{elementName: "revenues_folder", type: "folder", size: "28 KB", date: "time-stamp" },{elementName: "revenues_folder", type: "folder", size: "28 KB", date: "time-stamp" }, {elementName: "document.docx", type: "docx", size: "54 KB", date: "time-stamp" }, {elementName: "image.jpg", type: "jpg", size: "136 KB", date: "time-stamp" }];

  const uploadedFilesContainerRef = useRef<any | HTMLElement>(null);



  function downloadItem(item:any){
    //setModalTextInputDefaultValue(item.elementName)

    console.log(`Downloading ${item.type} ${item.elementName}...`)

  }

  function openRenameModal(item:any){
    setSelectedItem(item)
    setRenameModalIsOpen(true)
    //console.log(`Renaming ${item.type} ${item.elementName}...`)

  }

  function renameItem(item:any, newName:String){
    setRenameModalIsOpen(false)
    console.log(`Renaming ${item.type} ${item.elementName}... to ${newName}`)
  }

  function createNewFolder(folderName:String){


    console.log("Creating new folder named " + folderName + " in " + currentPath)

    setNewFolderModalIsOpen(false)


  }



  function deleteItem(item:any){
    //setModalTextInputDefaultValue(item.elementName)
    
    //console.log(`Deleting ${item.type} ${item.elementName}...`)


  }



  
  const dropDownMenuOptions = (item:object) => [
    { label: (<div onClick={()=>{downloadItem(item)}}>Download</div>), key: 'download' },
    { label: (<div onClick={()=>{openRenameModal(item)}}>Rename</div>), key: 'rename' },
    { label: (<div onClick={()=>{deleteItem(item)}}>Delete</div>), key: 'delete' },
  ]


  function dragDropStyle(currentDragDropState:string){

    switch(currentDragDropState){
      case "isDraggedOver":
        return styles.dragDropSurfaceDraggedOver;
      case "isNotDraggedOver":
        return styles.dragDropSurfaceNotDraggedOver;
      case "isDropAccepted":
        return styles.dragDropSurfaceDropAccepted;
    }

  }

  const [dragDropSurfaceState, setDragDropSurfaceState] = useState("isNotDraggedOver");

  const [listOfUploaded, setListOfUploaded] = React.useState<any[]>([]);


  function openModal() {
    setRenameModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
  }



  function uploadFiles(files: File[]){


    
    //console.log(files)

    setDragDropSurfaceState("isDropAccepted")

    uploadedFilesContainerRef.current!.scrollIntoView({ behavior: 'smooth' });

    // Send files to the backend
    const formData = new FormData();


    //console.log(`The last uploaded file is : ${files[Math.max(files.length-1, 0)].name}`)


    formData.append('file', files[Math.max(files.length-1, 0)]);
    formData.append("pathToFile", currentPath)



    

    for (let i = 0; i < files.length; i++) {
      //console.log(files[i].size)


      setListOfUploaded([
        ...listOfUploaded,
        { name: files[i].name, size: files[i].size}
      ]);
    
    }


    fetch("http://localhost:5000/api/upload", {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${currentIdToken}`,
             },
             body: formData

    }).then((response) => {
      
      
      if (response.status === 200) {

      }else{



      }
      
      //response.json()
    
    })
    .then((data) => {
      
      



      //console.log('Upload success:', data);
    })
    .catch((error) => {
      //console.error('Upload error:', error);
    });

    setTimeout(() => {
  
      setDragDropSurfaceState("isNotDraggedOver")
      

    }, 5500);
    

    




  }


  


  

  

  
  

  return (

    <div className={styles.app}>

      <RenameModal renameItem={renameItem} selectedItem={selectedItem} renameModalIsOpen={renameModalIsOpen} closeRenameModal={() => setRenameModalIsOpen(false)}></RenameModal>

      <NewFolderModal currentPath={currentPath} newFolderModalIsOpen={newFolderModalIsOpen} closeNewFolderModal={()=>{setNewFolderModalIsOpen(false)}} createNewFolder={(arg:string)=>{createNewFolder(arg)}} />
      

      
      <div className={styles.navbar}>

        <img src="https://i.ibb.co/xXPXQP0/logo.png" className={styles.logo}></img>


          
        <div className={styles.searchBar}>

          <img className={styles.searchBarIcon} src={search}></img>

          
          <input className={styles.searchBarInput} type="text" placeholder="Search Files..." name="search"></input>

        </div>

        <button className={styles.newFolder} onClick={()=>{setNewFolderModalIsOpen(true)}}>
        
        
          New Folder
        
          <img className={styles.newFolderIcon} src={addIcon}/>

        </button>

        <div className={styles.userContainer}>

          

          <div className={styles.userInfoContainer}>


            <img className={styles.userProfilePicture}src="https://xsgames.co/randomusers/assets/avatars/male/64.jpg">
            </img>

            <p className={styles.usernameText}>{currentUserEmail}</p>

          </div>

          <button className={styles.logOutButton} title={"Log out"} onClick={()=>{signOutFromFirebase()}}>
            <img className={styles.logOutButtonIcon} src={logOutIcon}></img>
          </button>


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

              {/**Make a real API call to the server to get real data*/}
            
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

          <h1 className={styles.sectionTitle}>Recent</h1>





          <ScrollContainer className={styles.recentFilesContainer} hideScrollbars={true}>



            {/* Si besoin de diviser en deux div, utiliser deux listes pour chaque div*/}

            

            <div className={styles.subRecentFilesContainer} id={styles.subRecentFilesContainer1}>
            {recentFilesList.map((item, index) => (

              


              <RecentFilesButton itemObject={item}  dropDownMenuOptions={dropDownMenuOptions}/>
              


            ))}


            
              
            </div>


          

            


          </ScrollContainer>

          <div id={styles.bottomContainer}>
            <div id={styles.allItemsContainer}>

              <h1 className={styles.sectionTitle} style={{marginLeft:'20px'}}>/myImages/LosAngeles2023/LosAngeles2023/LosAngeles2023/LosAngeles2023/</h1>
              {/*  <h1 className={styles.sectionTitle} style={{marginLeft:'20px'}}>All files</h1> */}


              <div id={styles.allFilesSortContainer}>
                <div style={{flexBasis:'',}}>
                  <button className={styles.sortItem}>Type</button>
                </div>

                <div style={{flexBasis:'calc(34% - 0px)'}}>
                  <button className={styles.sortItem}>Name</button>

                </div>

                <div style={{flexBasis:'calc(28%)'}}>

                  <button className={styles.sortItem}>Date created</button>

                </div>

                <div style={{flexBasis:'calc(20%)', }}>
                  <button className={styles.sortItem}>Size</button>

                </div>



              </div>

              <div id={styles.allFilesSubContainer}>

                {elementsList.map((item, index) => (

                

                <ElementButton itemObject={item} dropDownMenuOptions={dropDownMenuOptions}/>
                
                
                ))}




              </div>

            </div>



            <div className={styles.dragDropContainer}>

            <Dropzone 
              onDrop={acceptedFiles => console.log(acceptedFiles)} 
              onDragOver={()=>{setDragDropSurfaceState("isDraggedOver")}} 
              onDragLeave={()=>{setDragDropSurfaceState("isNotDraggedOver")}}
              onDropAccepted={(files)=>{
                uploadFiles(files)

                }}>
                {({getRootProps, getInputProps}) => (

                  
                  <div className={
                  `${styles.dragDropSurface} ${dragDropStyle(dragDropSurfaceState)}`
                  }
                  
                  
                  
                  
                  {...getRootProps()}>
                    
                    <input {...getInputProps()} />


                      <DragDropSuccessfullAnimation state={dragDropSurfaceState}/> 

                      {/*instead of using  <DragDropIcon/>, use dragdropsuccessfullanim but just change the colour depending on the state of the upload or on hover. also stop the anim like just run it once*/}
                      


                      

                      { dragDropSurfaceState == "isDraggedOver"   ? <h1 className={styles.dragDropText}>Drag your file here</h1>   : null }
                      { dragDropSurfaceState == "isNotDraggedOver"  ? <h1 className={styles.dragDropText}>Drag and drop a file, or <span id={styles.dragDropBrowseText}>Browse</span></h1>   : null }
                      { dragDropSurfaceState == "isDropAccepted" ? <div className={styles.dragDropUploadingTextContainer}><h1 className={`${styles.dragDropText} ${styles.dragDropUploadingText}`}>Uploading</h1></div>  : null }
                  
                      
                    </div>


                )}
              </Dropzone>

              {/*display the list of uploaded files*/}
                <div className={styles.uploadedFilesContainer} ref={uploadedFilesContainerRef}>
                  
                {
                    
                    listOfUploaded.map((file, index) => (

                      (index >= (listOfUploaded.length-3) ? <UploadedFileItem object={file}/> : null)

                    )
                    )

                  }

                </div>

            </div>


              

                




            


            

            
            
          </div>

          

          

            


          

          




        </div>






      </div>


      

      

        






      

      


    </div>

    
    
      
    )
    

    
}

export default App;