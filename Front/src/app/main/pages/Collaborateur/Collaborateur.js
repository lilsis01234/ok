import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React, { useEffect, useState } from 'react'
import CollaborateurHeader from './CollaborateurHeader'
import axios from 'axios'
import { motion } from 'framer-motion';
import CollaborateurList from '../EntrepriseStructure/tabs/CollaborateurList'



function Collaborateur() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [searchResults, setSearchResults] = useState([]);

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };


    useEffect(() => {
        axios.get('http://localhost:4000/api/collaborateur/allCollabWithMail')
            .then((response) => {
                setSearchResults(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const updateSearchResults = async (term) => {
        const response = await axios.get(`http://localhost:4000/api/collaborateur/searchCollab`, {
            params: {
                q: term,
            },
        })
        setSearchResults(response.data);
    }




    return (
        <FusePageCarded
            header={<CollaborateurHeader updateSearchResults={updateSearchResults} />}
            content={
                <motion.div
                    className="flex flex-wrap p-24"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={item} className="widget flex w-full">
                        <CollaborateurList collaborateur={searchResults} />
                    </motion.div>
                </motion.div>
            }
            scroll={isMobile ? 'normal' : 'content'}
        />
    )
}

export default Collaborateur
