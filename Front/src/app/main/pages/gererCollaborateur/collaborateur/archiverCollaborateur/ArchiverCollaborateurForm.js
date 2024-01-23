import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ArchiverCollaborateurHeaderForm from './ArchiverCollaborateurHeaderForm';
import ArchiveTabs from './tabs/archiveTabs';
const { yupResolver } = require("@hookform/resolvers/yup");
import * as yup from 'yup';

const schema = yup.object().shape({
    statut: yup.string().required('Veuillez indiquer la raison pour laquelle vous voulez archiver ce collaborateur.'),
    dateDebauche : yup.date().required('Veuillez entrer le date de débauche du collaborateur'),
});


function ArchiveCollaborateurForm(props) {
    const {collaborateurId} = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    })

    const { reset, watch, control, onChange, fomState } =  methods || {};
    const form = watch();

    function handleTabChange(event, value) {
        setTabValue(value)
    }
    

  return (
   <FormProvider {...methods}>
        <FusePageCarded
            header={<ArchiverCollaborateurHeaderForm formValues={form} id={collaborateurId}/>}
            content = {
                <>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: 'w-full h-64 border-b-1' }}
                    >
                        <Tab className="h-64" label="Archive"/>
                    </Tabs>
                    <div className="p-16 sm:p-24 max-w-3xl">
                        <div className={tabValue !== 0 ? 'hidden' : ''}>
                            <ArchiveTabs methods={methods} formValues={form}/>
                        </div>
                    </div>
                </>
            }
            scroll={isMobile ? 'normal' : 'content'}
        />
   </FormProvider>
  )
}

export default ArchiveCollaborateurForm
