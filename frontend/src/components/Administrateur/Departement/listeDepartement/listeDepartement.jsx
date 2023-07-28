import axios from "axios";
import React, { useEffect, useState } from "react";
import {MdEdit} from 'react-icons/md'
import {MdOutlineDeleteForever} from 'react-icons/md'
import './listeDepartement.css'

const ListDepartement = () => {
    const [data, setData] = useState([])
    useEffect(()=> {
        axios.get("http://192.168.16.244:4001/api/departement/all_departement")
        .then((response) => {
            setData(response.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    }, [])
    return (
        <div className="listDepartement">
            <h2 className="listDepartement_title">Liste des Départements </h2>
            <table className="listDepartement_table">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Département</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((departement) => (
                            <tr key={departement.id}>
                                <td>{departement.id}</td>
                                <td>{departement.nomDepartement}</td>
                                <td>
                                    <button className="table_item_icon"><MdEdit/></button>
                                    <button className="table_item_icon"><MdOutlineDeleteForever/></button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListDepartement;