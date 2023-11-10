import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Paper, Typography, Box} from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect} from 'react';
import axios from 'axios';



const GenderDashboard = () => {
    const [data, setData] = useState([]);
    const [maleCollab, setMalCollab] = useState(0);
    const [femaleCollab, setFemaleCollab] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        axios
            .get("http://localhost:4001/api/collaborateur/all")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        const maleCollab = data.filter((item) => item.sexe === 'Masculin');
        const femaleCollab = data.filter((item) => item.sexe === 'Féminin');
        setMalCollab(maleCollab.length);
        setFemaleCollab(femaleCollab.length);
    }, [data]);

    // console.log(data)
    // console.log("Male Collaborateurs :", maleCollab)
    // console.log("Female Collaborateurs :", femaleCollab)
    const series = [maleCollab, femaleCollab]
    const labels = ['Man', 'Woman']

    const chartOptions = {
        chart: {
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
            sparkline: {
                enabled: true,
            },
        },
        colors: ['#319795', '#4FD1C5'],
        labels,
        series,
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false,
                donut: {
                    size: '70%',
                },
            },
        },
        stroke: {
            colors: [theme.palette.background.paper],
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
            active: {
                filter: {
                    type: 'none',
                },
            },
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark',
            custom: ({ seriesIndex, w }) =>
             `<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
                <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
            </div>`,
        },

    }

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24">
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                    Gender
                </Typography>
                {/* <div className="ml-8">
                    <Chip size="small" className="font-medium text-sm" label=" 30 days" />
                </div> */}
            </div>

            <div className="flex flex-col flex-auto mt-24 h-192">
                <ReactApexChart
                    className="flex flex-auto items-center justify-center w-full h-full"
                    options={chartOptions}
                    series={series}
                    type={chartOptions.chart.type}
                    height={chartOptions.chart.height}
                />
            </div>
            {<div className="mt-32">
                <div className="-my-12 divide-y">
                    {series.map((dataset, i) => (
                        <div className="grid grid-cols-3 py-12" key={i}>
                            <div className="flex items-center">
                                <Box
                                    className="flex-0 w-8 h-8 rounded-full"
                                    sx={{ backgroundColor: chartOptions.colors[i] }}
                                />
                                <Typography className="ml-12 truncate">{labels[i]}</Typography>
                            </div>
                            {/* <Typography className="font-medium text-right">
                                {((uniqueVisitors * dataset) / 100).toLocaleString('en-US')}
                            </Typography> */}
                            <Typography className="text-right" color="text.secondary">
                                {dataset}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div> }
        </Paper>
    )
}

export default GenderDashboard
