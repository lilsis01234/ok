import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './discussion.css';
import { Link } from "react-router-dom";
import {BiPencil} from "react-icons/bi";

const Discussions =()=>{
    const{id}=useParams();
    const[discussion,setDiscussion]=useState([]);

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
      })

     return(
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
            <div className="meta-info">
                <h1 className="module-title">Module {discussions.Module.titreModule}</h1>
                <h1 className="collab-name">{discussions.Collab.nom} {discussions.Collab.prenom}</h1>
            </div>
            <h2 className="discussion-title">{discussions.sujet}</h2>
            <p className="discussion-content">{discussions.contenu}</p>
        </div>
    ))}
    </div>



        </>
    )
}
export default Discussions