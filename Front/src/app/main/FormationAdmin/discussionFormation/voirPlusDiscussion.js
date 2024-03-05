import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './discussion.css';
import { Link } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { FaFilePdf, FaFileWord, FaFile, FaImage,FaFilePowerpoint,FaFileExcel,FaFileArchive,FaFileCsv } from "react-icons/fa";
import {BsFiletypeSql} from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { Typography} from '@mui/material'


const Discussion = () => {
    const { id } = useParams();
    console.log(id)
    const [discussion, setDiscussion] = useState([]);
    const [reponses, setReponses] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id;

    const fetchDiscussion = () => {
        axios.get(`http://localhost:4000/api/discussions/discussion/${id}`)
            .then(res => {
                console.log(res.data)
                setDiscussion([res.data])
            })
            .catch(err => console.log(err));
    }

    const fetchReponses = () =>{
        axios.get(`http://localhost:4000/api/commentaire/all_comments/${id}`)
        .then(res => {
            console.log(res.data)
            setReponses(res.data)
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchDiscussion();
        fetchReponses();
    }, [id]);
    
    console.log(reponses)
    
    const viewFile = (fileName) => {
        window.open(`http://localhost:4000/api/discussions/view/${encodeURIComponent(fileName)}`, '_blank');
    };

    const getFileIcon = (fileName) => {
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension === 'pdf') {
            return <FaFilePdf />;
        } 
        else if (fileExtension === 'docx' || fileExtension === 'doc') {
            return <FaFileWord />;
        } 
        else if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') {
            return <FaImage />;
        } 
        else if(fileExtension === 'sql'){
            return <BsFiletypeSql />;
        }
        else if(fileExtension === 'pptx'){
            return <FaFilePowerpoint/>
        }
        else if (fileExtension === 'rar'){
            return <FaFileArchive/>
        }
        else if(fileExtension === 'csv'){
            return <FaFileCsv/>
        }
        else if (fileExtension === 'xlsx'){
            return <FaFileExcel/>
        }
        else if(fileExtension === 'gif'){
            return <AiOutlineFileGif/>
        }
        else{
            return<FaFile/>
        }
    };

    const handleDelete=async (id)=>{
        try{
            await axios.delete(`http://localhost:4000/api/discussions/${id}/deleteDiscussion`)
            window.location.reload()
        }catch(err) {
            console.log(err)
        }
    }

    const handleDeleteComment=async (id)=>{
        try{
            await axios.delete(`http://localhost:4000/api/commentaire/deletecomment/${id}`)
            window.location.reload()
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="discussion-container">
                <div className="top">
                    <Typography className="discussion-heading">Discussion</Typography>
                
                </div>

                {discussion !== null && discussion.map((discussions, index) => (

                    <div className="discussion-item" key={index}>

                        {userId === discussions.Collab.id &&
                        <button onClick={(e)=>{handleDelete(discussions.id)}}>Supprimer</button>
                        }

                        <div className="meta-info">
                            <Typography className="module-title">Module {discussions.Module.titreModule}</Typography>
                            <Typography className="collab-name">{discussions.Collab.nom} {discussions.Collab.prenom}</Typography>
                        </div>
                        
                        <Typography className="discussion-title">{discussions.sujet}</Typography>
                        
                        <Typography className="discussion-content">{discussions.contenu}</Typography>
                        
                        <div className="file-list">
                            
                            {discussions.fichier !== null && discussions.fichier.split(', ').map((filePath, idx) => (
                                <div key={idx} className="file-link">
                                    <button className='fichier' onClick={() => viewFile(filePath.split('\\').pop())}>
                                        {getFileIcon(filePath.split('\\').pop())}
                                        <Typography>{filePath.split('\\').pop()}</Typography>
                                    </button>
                                </div>
                            ))}
                        
                        </div>
                        
                        <button><Link to={`/repondre/${discussions.id}`}>Répondre</Link></button>
                    </div>
                ))}
            </div>

            {reponses !== null && reponses.map((discussions, index) => (

            <div className="discussion-item" key={index}>

                {userId === discussions.Collab.id &&
                <button onClick={(e)=>{handleDeleteComment(discussions.id)}}>Supprimer</button>
                }
                
                <Typography className="discussion-content">{discussions.contenu}</Typography>
                
                <div className="file-list">
                    
                    {discussions.fichier !== null && discussions.fichier.split(', ').map((filePath, idx) => (
                        <div key={idx} className="file-link">
                            <button className='fichier' onClick={() => viewFile(filePath.split('\\').pop())}>
                                {getFileIcon(filePath.split('\\').pop())}
                                <Typography>{filePath.split('\\').pop()}</Typography>
                            </button>
                        </div>
                    ))}
                
                </div>
                
                {/* <button><Link to={`/repondre/${discussions.id}`}>Répondre</Link></button> */}
            </div>
            ))}
        </>
    );
}

export default Discussion;
