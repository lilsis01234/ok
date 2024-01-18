import React, { useState} from 'react';
import {TextField, Grid, Button, Paper, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sary from './icone.png';
// const { default: FusePageCarded } = require("@fuse/core/FusePageCarded/FusePageCarded");


const AjoutFormation = ()=>{

    const navigate = useNavigate()
    const[theme,setTheme] = useState('');
    const[description,setDescription]= useState('');
    const formateur = JSON.parse(localStorage.getItem('user')).id;

    const handleSubmit =(event)=>{
        event.preventDefault();
        axios.post('http://localhost:4000/api/formations/addFormation', {theme,description,formateur})
        .then(res => {
            console.log(res);
            navigate('/dashboards/listeFormation');
        }).catch(err =>console.log(err));
    }
    return(
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
        <Paper elevation={3} style={{ padding: 64, width: '100%' }}>

        <Typography
            className="text-24 md:text-32 font-extrabold tracking-tight sm:block lg:hidden md:hidden"
        >
            Nouvelle formation
        </Typography>

          <div className='flex hidden md:hidden sm:hidden lg:flex'>
            <img src={Sary} className='mt-[-60px]'/>
            <Typography 
              className="text-32 md:text-64 font-extrabold tracking-tight"
            >
              Nouvelle formation
            </Typography>
          </div>
         
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                className="mt-8 mb-16"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                required
                label="Thème"
                fullWidth
                autoFocus
              />

              <TextField
                className="mt-8 mb-16"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
                label="Description"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-8 mb-16"
                style={{ marginTop: 16 }}
              >
                Ajouter
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
    )
}

export default AjoutFormation