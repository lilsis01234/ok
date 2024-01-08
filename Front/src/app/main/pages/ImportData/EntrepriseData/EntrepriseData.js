import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import EntrepriseDataHeader from './EntrepriseDataHeader';
import CollaborateurDataForm from '../CollaborateurData/tabs/CollaborateurDataForm';
import EntrepriseDataImportForm from './tabs/EntrepriseDataImportForm';
import InstructionImportEntreprise from './tabs/InstructionImportEntreprise';


function EntrepriseData() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [tabValue, setTabValue] = useState(0);


  const methods = useForm({
    mode: 'onChange',
    defaultValues: {}
  });


  const { reset, watch, control, onChange, formState, handleSubmit } = methods || {}

  function handleTabChange(event, value) {
    setTabValue(value)
  }


  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<EntrepriseDataHeader />}
        content={
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
              <Tab className='h-64' label="Formulaire" />
              <Tab className="h-64" label="Consigne" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <EntrepriseDataImportForm />
              </div>
              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <InstructionImportEntreprise />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}

export default EntrepriseData
