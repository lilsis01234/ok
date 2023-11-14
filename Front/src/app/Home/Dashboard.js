import FusePageSimple from '@fuse/core/FusePageSimple';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import imageTest from '../../../../Front/src/image_test.jpg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const Dashboard = () => {


  return (
    <FusePageSimple
      content={
        <>
          <div className="flex justify-center w-full p-24 sm:p-32">
            <div className="w-full px-24 md:px-32 pb-24">
              <div className="md:flex">

                {/* Column 1 */}
                <div className="flex flex-col w-full md:w-1/2">
                  <div className="flex-auto">
                    <img src={imageTest} className="rounded-xl" alt="Sahaza Group" />
                  </div>
                  <div className="flex-auto w-full rounded-sm h-48 bg-grey-100 text-center mt-10">
                    <Paper className='h-48 w-full'>
                    <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-700 mt-10">
                        Soon will be Christmas Day 🎉🎆
                      </Typography>
                    </Paper>
                  </div>

                  <div className="flex-auto w-full h-98 rounded-sm bg-grey-100 text-center mt-10">
                  <Paper className='w-full h-98 aspect-w-1'>
                    <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-700 mt-20 mb-30">
                        Anniversaires du mois🎉🎆
                    </Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque lacus id enim lobortis imperdiet. Sed mauris massa, tincidunt efficitur lorem vitae, tristique lacinia velit. Donec dignissim suscipit ex, vehicula finibus magna congue nec. Donec tempus vitae felis vel dapibus. Ut hendrerit vitae magna nec malesuada.
                  </Paper>
                  </div>

                  <div className="flex-auto mt-50">
                    <img src={imageTest} className="rounded-xl mt-50" alt="Sahaza Group" />
                  </div>

                  <div className="flex-auto w-200">Les 3 directions</div>
                  <div className="flex-auto w-200">Liste des formations</div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col w-full md:w-1/4 ml-10">
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl mb-6 ml-10 overflow-hidden aspect-w-1">
                    <div className="text-center mt-8">
                      <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-400 mt-60">
                        Mot du jour
                      </Typography>
                    </div>
                    <Typography
                      className="flex items-baseline justify-center w-full mt-20 mb-24"
                      color="text.secondary"
                    >
                      <b className="px-8">Exemple de mot du jour</b>
                    </Typography>
                  </Paper>

                  <Paper className="flex flex-col flex-auto shadow rounded-2xl mb-6 overflow-hidden aspect-w-1 ml-10 mt-10">
                    <div className="text-center mt-8">
                      <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-green-400">
                        Actualités
                      </Typography>
                    </div>
                    <Typography
                      className="flex items-baseline justify-center w-full mt-20"
                      color="text.secondary"
                    >
                      <b className="px-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque lacus id enim lobortis imperdiet. Sed mauris massa, tincidunt efficitur lorem vitae, tristique lacinia velit. Donec dignissim suscipit ex, vehicula finibus magna congue nec. Donec tempus vitae felis vel dapibus. Ut hendrerit vitae magna nec malesuada.</b>
                    </Typography>
                  </Paper>
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl mb-6 overflow-hidden aspect-w-1 ml-10 mt-10">
                    <div className="text-center mt-8">
                      <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-green-400">
                        Actualités
                      </Typography>
                    </div>
                    <Typography
                      className="flex items-baseline justify-center w-full mt-20"
                      color="text.secondary"
                    >
                      <b className="px-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque lacus id enim lobortis imperdiet. Sed mauris massa, tincidunt efficitur lorem vitae, tristique lacinia velit. Donec dignissim suscipit ex, vehicula finibus magna congue nec. Donec tempus vitae felis vel dapibus. Ut hendrerit vitae magna nec malesuada.</b>
                    </Typography>
                  </Paper>
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl mb-6 overflow-hidden aspect-w-1 ml-10 mt-10">
                    <div className="text-center mt-8">
                      <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-green-400">
                        Actualités
                      </Typography>
                    </div>
                    <Typography
                      className="flex items-baseline justify-center w-full mt-20"
                      color="text.secondary"
                    >
                      <b className="px-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque lacus id enim lobortis imperdiet. Sed mauris massa, tincidunt efficitur lorem vitae, tristique lacinia velit. Donec dignissim suscipit ex, vehicula finibus magna congue nec. Donec tempus vitae felis vel dapibus. Ut hendrerit vitae magna nec malesuada.</b>
                    </Typography>
                  </Paper>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col w-full md:w-1/4 ml-8">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>

                <div className="flex-auto">Graphe 3 sites</div>
                <div className="flex-auto">Citation sur SAHAZA GROUP</div>
                <div className="flex-auto">Resultats des compétitions</div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Dashboard;
