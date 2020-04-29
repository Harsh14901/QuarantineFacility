import {Doughnut} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import getData from "facility/getData";
import Card from "components/Card/Card";
import GridItem from "components/Grid/GridItem";
import CardBody from "components/Card/CardBody";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import CardFooter from "components/Card/CardFooter";
import AccessTime from "@material-ui/icons/AccessTime";
import CardHeader from "components/Card/CardHeader";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";
import {DOMAIN} from "variables/Constants";
const useStyles = makeStyles(styles);

function DonutGraph(props){
        const classes = useStyles();
        const [data,setData] = useState({});
        const options={
                events: ['mousemove', 'mouseout', 'touchstart', 'touchmove', 'touchend'],
                responsive: true,
                // maintainAspectRatio: false,
                tooltips: {
                        mode: 'point',
                        position: 'nearest',
                        callbacks: {
                                label: function (tooltipItem, data) {
                                        const dataset = data.datasets[tooltipItem.datasetIndex];
                                        const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                                        const total = meta.total;
                                        const currentValue = dataset.data[tooltipItem.index];
                                        const percentage = parseFloat(
                                            ((currentValue / total) * 100).toFixed(1)
                                        );
                                        return currentValue + ' (' + percentage + '%)';
                                },
                                title: function (tooltipItem, data) {
                                        return data.labels[tooltipItem[0].index];
                                },
                        },
                },
        };

        function getGraphData() {
                const callback = result =>{
                        let a = result['Ward-1'];
                        let b= result['Ward-2'];
                        let c = result['vacant'];
                        // console.log("Result is ",result);

                        setData({
                                labels: [
                                        'Ward 1',
                                        'Ward 2',
                                        'Vacant'
                                ],
                                datasets: [{

                                        data: [a,b,c],
                                        backgroundColor: [
                                                '#FF2354',
                                                '#36A2EB',
                                                '#4caf50'
                                        ],
                                        hoverBackgroundColor: [
                                                '#FF2344',
                                                '#36B2EB',
                                                '#3b9d40'
                                        ],

                                }],
                        }
                        );
                };
                if(props.data){
                        // console.log(props.data)
                        callback(props.data)
                }
                else
                        getData(callback,DOMAIN + '/analytics/ward_distribution/')
        }

        useEffect(() => {
                getGraphData();
        }, []);

        return(
            <GridItem xs={12} md={props.size==='large'?12:8}>
            <Card>
                    <CardHeader >
                    <Doughnut data={data} options={options}
                    />
                    </CardHeader>
                    <CardBody>
                            <h4 className={classes.cardTitle}>{"Ward Distribution"}</h4>
                    </CardBody>
                    <CardFooter chart>
                    </CardFooter>
            </Card>
            </GridItem>

        )

}

export default DonutGraph
