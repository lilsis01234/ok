import { Button, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';

function ConfidentialiteFormation(props) {
  const { methods, formValues } = props;
  const { control, formState } = methods || {};
  const { errors } = formState || {};
  const [fields, setFields] = useState([{ id: 1 }]);



  if (!methods) {
    return null;
  }

  //Pour ajouter plus de champs à notre formulaire
  const addField = () => {
    setFields([...fields, { id: fields.length + 1 }])
  }

  //Pour supprimer le derniers champs du formulaire
  const deleteField = () => {
    if (fields.length > 1) {
      setFields(fields.slice(0, -1));
    }
  }

  return (
    <div>
      {fields.map((field) => (
        <Controller
          key={field.id}
          name={`critere${field.id}`}
          control={control}
          render={({ data }) => (
            <TextField
              {...data}
              className="mt-8 mb-16"
              label={`Critère ${field.id}`}
              autoFocus
              id="critère"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      ))}
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          onClick={addField}
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
        >
          Ajouter plus de critère
        </Button>
        <Button
          onClick={deleteField}
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="error"
        >
          Supprimer le dernier critère
        </Button>
      </motion.div>


    </div>
  )
}

export default ConfidentialiteFormation
