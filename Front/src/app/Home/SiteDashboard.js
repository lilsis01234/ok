import FuseLoading from '@fuse/core/FuseLoading';
import { useTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';


const SiteDashboard = () => {
    const [data, setData] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
         await axios.get("http://localhost:4000/api/collaborateur/all")
         .then((response) => {
           const collab = response.data;

           const counts = {};
           collab.forEach(collab => {
                counts[collab.sites?.nomSite] = (counts[collab.sites?.nomSite] || 0) + 1;
           });

           const chartOptions = {
            chart : {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline : {
                    enabled : true,
                }
            },
            labels : Object.keys(counts),
            legend : {
                show : true,
                position : 'bottom',
            },
            plotOptions : {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%',
                    },
                },
            },
            states : {
                hover : {
                    filter : {
                        type : 'darken',
                        value : 0.75,
                    }
                }
            },
            stroke : {
                width : 2,
            },
            theme : {
                monochrome : {
                    enabled : true,
                    color : theme.palette.secondary.main,
                    shadeIntensity: 0.75,
                    shadeTo : 'dark',
                },
            },
            yaxis : {
                labels : {
                    style : {
                        colors : theme.palette.text.secondary
                    }
                }
            },
            series : Object.values(counts),
            tooltip : {
                fillSeriesColor: false,
                theme : 'dark',
            },
          
          };
    
          console.log("Chart Options:", chartOptions)
          setData(chartOptions);
         })
         .catch((error) => {
            console.error(error)
         })
    }

    console.log(data.series)

    
  return (
    // <div className="flex flex-col flex-auto mt-6">
    //     <ReactApexChart
    //         className="flex-auto w-full"
    //         options={data.chart ? data : {}} 
    //         series={data.series ? data.series : []}
    //         type={data.chart?.type}
    //     />
    // </div>
    <div className="flex flex-col flex-auto ">
        {data.series && data.chart ? (
            <ReactApexChart
                className="flex flex-auto items-center justify-center w-full h-full"
                options={data} 
                series={data.series}
                type={data.chart?.type}
            />
        ) : (
           <FuseLoading/>
        )}
    </div>
  )
}

export default SiteDashboard
