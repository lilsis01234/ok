import FusePageCarded from '@fuse/core/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React, { useEffect, useState } from 'react'
import ActualitiesHeader from './ActualitiesHeader'
import ActualitiesTable from './ActualitiesTable'
import axios from 'axios';

function Actualites() {
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/actualite/all")
      .then((response) => {
        setSearchResults(response.data)
        updateSearchResults('');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [])

  const updateSearchResults = async (term) => {
        const response = await axios.get(`http://localhost:4000/api/actualite/search`, {
          params: {
            q: term,
          },
        });
        setSearchResults(response.data)
  };

 

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))


  return (
    <FusePageCarded
      header={<ActualitiesHeader 
        updateSearchResults={updateSearchResults}
      />}
      content={<ActualitiesTable searchResults={searchResults} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default Actualites