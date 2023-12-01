import FusePageCarded from '@fuse/core/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React, { useEffect, useState } from 'react'
import CollaborateurHeader from './CollaborateurHeader'
import CollaborateurTable from './CollaborateurTable'
import axios from 'axios';

function Collaborateur() {
  // const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/collaborateur/all")
      .then((response) => {
        setSearchResults(response.data)
        updateSearchResults('');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [])

  const updateSearchResults = async (term) => {
        const response = await axios.get(`http://localhost:4000/api/collaborateur/search`, {
          params: {
            q: term,
          },
        });
        setSearchResults(response.data)
  };

 

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))


  return (
    <FusePageCarded
      header={<CollaborateurHeader 
        updateSearchResults={updateSearchResults}
      />}
      content={<CollaborateurTable searchResults={searchResults} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default Collaborateur