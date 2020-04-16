import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import ChartistGraph from "react-chartist";
import {line} from "views/Components/analytics/ChartOpAnims";
import CardBody from "components/Card/CardBody";
import GridItem from "components/Grid/GridItem";
import React, {useEffect, useState} from "react";
import getData from "facility/getData";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";



const useStyles = makeStyles(styles);



function ActiveVsDischargeGraph() {

        const classes = useStyles();

        const [data,setData] = useState({});
        const [options,setOptions] = useState(line.options);


        function getGraphData() {
                const callback = activeData => {
                        const callback2 = dischargeData => {
                                let percentages=[];
                                let percentage2=[];

                                let labels=[];

                                for (let x in dischargeData){

                                        labels.push(x);
                                        let temp;
                                        try {
                                                temp = dischargeData[x] * 100 / (activeData[x] + dischargeData[x])
                                        }catch (e) {
                                                continue
                                        }
                                        percentages.push(temp);
                                        percentage2.push(100-temp)
                                }

                                if(percentages.length>7){
                                        let abcd=parseInt((percentages.length/10).toFixed(0));
                                        setOptions({...options,axisX: {...options.axisX,
                                                        labelInterpolationFnc: function (value,index) {
                                                                return (index%abcd===0)?value:''
                                                        }}});

                                }

                                setOptions({...options,high: 110,height: "30vh"});
                                setData({labels: labels,series: [percentages,percentage2]});
                                console.log("hurrah",[percentages,percentage2])

                        };

                        getData(callback2,'http://127.0.0.1:8000/analytics/active_cases/')


                };

                getData(callback,'http://127.0.0.1:8000/analytics/total_discharges/')

        }


        useEffect(() => {
                getGraphData();
        }, []);




        return(
            <GridItem xs={12} md={6}>
                    <Card chart>
                            <CardHeader color={"info"} >
                                    <ChartistGraph
                                        className="ct-chart"
                                        data={data}
                                        type="Line"
                                        options={options}
                                        listener={line.animation}
                                    />
                            </CardHeader>
                            <CardBody>
                                    <h3 className={classes.cardTitle}>Active Cases vs Discharged Cases</h3>
                            </CardBody>
                    </Card>
            </GridItem>
        )
}

export default ActiveVsDischargeGraph
