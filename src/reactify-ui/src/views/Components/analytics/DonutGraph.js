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
const useStyles = makeStyles(styles);

function DonutGraph(props){
        const classes = useStyles();
        const [data,setData] = useState({});

        function getGraphData() {
                const callback = result =>{
                        let a = result['Ward-1'];
                        let b= result['Ward-2'];
                        let c = result['vacant'];

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
                        });
                };
                getData(callback,'http://127.0.0.1:8000/analytics/ward_distribution/')
        }

        useEffect(() => {
                getGraphData();
        }, []);

        return(
            <GridItem xs={12} md={8}>
            <Card>
                    <CardHeader >
                    <Doughnut data={data}
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
