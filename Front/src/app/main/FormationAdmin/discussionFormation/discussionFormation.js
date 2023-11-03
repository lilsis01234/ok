import React from "react";
import { useParams } from "react-router-dom";

const Discussions =()=>{
    const{id}=useParams();
    
    return(
        <>
        <h1>Bonjour</h1>
        <h2>Discussions récentes</h2>
        {id}
        </>
    )
}
export default Discussions