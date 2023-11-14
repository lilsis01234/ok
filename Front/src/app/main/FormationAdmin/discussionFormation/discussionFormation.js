import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './discussion.css';
import { Link } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { FaFilePdf, FaFileWord, FaFile, FaImage,FaFilePowerpoint,FaFileExcel,FaFileArchive,FaFileCsv } from "react-icons/fa";
import {BsFiletypeSql} from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";

const Discussions = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState([]);

    const fetchDiscussion = () => {
        axios.get(`http://localhost:4001/api/discussions/all_discussions/${id}`)
            .then(res => {
                console.log(res.data)
                setDiscussion(res.data)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchDiscussion();
    }, [id]);

    // const displayFile = (fileName) => {
    //     const temporaryLink = `http://localhost:4001/api/discussions/temporary-link/${encodeURIComponent(fileName)}`;
    
    //     return (
    //         <a href={temporaryLink} target="_blank" rel="noopener noreferrer">
    //             {fileName}
    //         </a>
    //     );
    // };
    
    const viewFile = (fileName) => {
        window.open(`http://localhost:4001/api/discussions/view/${encodeURIComponent(fileName)}`, '_blank');
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
            await axios.delete(`http://localhost:4001/api/discussions/${id}/deleteDiscussion`)
            window.location.reload()
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="discussion-container">
                <div className="top">
                    <h2 className="discussion-heading">Discussions récentes</h2>
                    <Link to={`/addDiscussion/${id}`} className="add-discussion-button">
                        <BiPencil />
                    </Link>
                </div>
                {discussion.map((discussions, index) => (
                    <div className="discussion-item" key={index}>
                        <button onClick={(e)=>{handleDelete(discussions.id)}}>Supprimer</button>
                        <div className="meta-info">
                            <h1 className="module-title">Module {discussions.Module.titreModule}</h1>
                            <h1 className="collab-name">{discussions.Collab.nom} {discussions.Collab.prenom}</h1>
                        </div>
                        <h2 className="discussion-title">{discussions.sujet}</h2>
                        <p className="discussion-content">{discussions.contenu}</p>
                        <div className="file-list">
                            {discussions.fichier !== null && discussions.fichier.split(', ').map((filePath, idx) => (
                                <div key={idx} className="file-link">
                                    <button className='fichier' onClick={() => viewFile(filePath.split('\\').pop())}>
                                        {getFileIcon(filePath.split('\\').pop())}
                                        <p>{filePath.split('\\').pop()}</p>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Discussions;
