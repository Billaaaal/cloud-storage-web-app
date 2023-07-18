import React from 'react';
import styles from './elementButton.module.css';
import folderIcon from '../../assets/documents.svg'
//const SidePannelButton = (props: { icon:String ; text: String; }) => {

const ElementButton = (props:any) => {

    //check if the elementName has a file extension if not then it is a folder

    var item = props.itemObject


    const isAFile = (item.type === "folder") ? false : true;

    var fileTypeIcongBg:string;
    var fileTypeIconTextBg:string;





    

    switch (item.type) {
        case 'pdf':
            fileTypeIcongBg = "#ffeddf"
            fileTypeIconTextBg = "#f6b375"
            break;
        case 'docx':
            fileTypeIcongBg = "#e6e6ff"
            fileTypeIconTextBg = "#656be0;"
            break;
        case 'jpg':
            fileTypeIcongBg = "#e6e6ff"
            fileTypeIconTextBg = "#656be0;"

            break;
        case 'jpeg':
            fileTypeIcongBg = "#e6e6ff"
            fileTypeIconTextBg = "#656be0;"

            break;
        case 'png':
            fileTypeIcongBg = "#e6e6ff"
            fileTypeIconTextBg = "#656be0;"

            break;
        case 'gif':
            fileTypeIcongBg = "#f8e3ff"
            fileTypeIconTextBg = "#c66fe5"
            break;
        case 'mp4':
            fileTypeIcongBg = "#f8e3ff"
            fileTypeIconTextBg = "#c66fe5"

            break;
        case 'mp3':
            fileTypeIcongBg = "#f8e3ff"
            fileTypeIconTextBg = "#c66fe5"

            break;        
        default:
            fileTypeIcongBg = "#f8e3ff"
            fileTypeIconTextBg = "#c66fe5"

            break;    
            
            
            


    }



    
    
    return (


        <div className={styles.elementButton}>

            {isAFile   ? <div className={styles.fileTypeIcon} style={{backgroundColor:fileTypeIcongBg, color:fileTypeIconTextBg}}>{item.type.toUpperCase()}</div>

                :  <img className={styles.folderIcon} src={folderIcon}></img>
            }

            <h1 className={styles.elementName}>{item.elementName}</h1>
            <h1 className={styles.date}>{item.date}</h1>
            <h1 className={styles.size}>{item.size}</h1>



            
        </div>



        

    
    )
}



export default ElementButton;