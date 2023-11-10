import React, {useState, useEffect} from 'react'
import { useParams, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Button, Tabs, Tab } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import EquipeItemHeader from './EquipeItemHeader';
import BasicInfoEquipe from './tabs/BasicInfoEquipe';

const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { useForm, FormProvider } = require("react-hook-form");
const { yupResolver } = require("@hookform/resolvers/yup");

const schema = yup.object().shape({
  nomEquipe: yup.string().required("You must enter a team name"),
  // .min(5, 'The product name must be at least 5 characters'),
});

function EquipeItemList() {
  const { equipeId } = useParams();
  // console.log(equipeId)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [tabValue, setTabValue] = useState(0);
  const [noEquipe, setnoEquipe] = useState(false);

  const [equipe, setEquipe] = useState([]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { reset, watch, control, onChange, formState } = methods || {};
  const form = watch();

  useEffect(() => {
    async function fetchData() {
      try {
        if (equipeId === "new") {
          console.log("Ajout d'une nouvelle équipe");
          setnoEquipe(false);
        } else {
          console.log("Affichage d'une équipe existante");
          axios
            .get(`http://localhost:4001/api/equipe/view/${equipeId}`)
            .then(response => {
              setEquipe(response.data.equipe);
              console.log(response.data.equipe);
              setnoEquipe(false);
            })
            .catch((error) => {
              setnoEquipe(true);
              console.error(error);
            });
        }
      } catch (error) {
        console.error("Error fetching Direction data:", error);
        setnoEquipe(true);
      }
    }
    fetchData();
  }, [equipeId]);

  useEffect(() => {
    if (equipe && Object.keys(equipe).length > 0) {
      const { id, nomEquipe, projet } = equipe;
      reset({ id, nomEquipe, projet });
    }
  }, [equipe, reset]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (noEquipe) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {" "}
          There is no such team!{" "}
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/business/manage/team"
          color="inherit"
        >
          {" "}
          Go To Teams Page{" "}
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header = {<EquipeItemHeader formValues={form}/>}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Basic Team Info" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoEquipe methods={methods} formValues={form}/>    
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}
export default EquipeItemList;
