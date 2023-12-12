import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple'
import React, {useRef, useState, useEffect} from 'react'
import ContactHeader from './ContactHeader'
import { styled } from '@mui/material'
import ContactListe from './ContactListe';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import ContactSideBarContent from './ContactSideBarContent';
import { useParams } from 'react-router-dom';



const Root = styled(FusePageSimple)(({theme})=> ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
      },
}));


const ContactApp = ()=> {
    const pageLayout = useRef(null);
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [listCollab, setListeCollab] = useState([]);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const routeParams = useParams();

    const handleRightSidebarClose = () => {
      setRightSidebarOpen(false)
    }

    const fetchCollaborateur = () => {
      axios.get('http://localhost:4000/api/compte_collaborateur/all')
        .then(res => { setListeCollab(res.data)})
          .catch(err => console.log(err));
        }
  
        useEffect(() => {
          fetchCollaborateur();
      }, [])

    useEffect(() => {
      setRightSidebarOpen(Boolean(routeParams.id));
    }, [routeParams])


    return (
    <Root
      header={<ContactHeader pageLayout={pageLayout}/>}
      content = {<ContactListe listCollab={listCollab } setListeCollab={setListeCollab}/>}
      ref={pageLayout}
      rightSidebarContent = {<ContactSideBarContent/>}
      rightSidebarOpen={rightSidebarOpen}
      setRightSidebarOnClose={handleRightSidebarClose}
      rightSideBarWidth = {640}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}


export default ContactApp
0