import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import ChartistGraph from "react-chartist";
import {dailySalesChart, emailsSubscriptionChart} from "variables/charts";
import CardBody from "components/Card/CardBody";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import CardFooter from "components/Card/CardFooter";
import AccessTime from "@material-ui/icons/AccessTime";
import GridContainer from "components/Grid/GridContainer";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";
import getData from "facility/getData";
import {line} from "views/Components/analytics/ChartOpAnims";


const useStyles = makeStyles(styles);

function LineGraphs(props) {

        const classes=useStyles();

        const [data,setData] = useState({});

        const [options,setOptions]= useState(line.options);

                function getGraphData() {
                        const callback = result => {
                                let labels=[];
                                let series=[];
                                let max=0;
                                for (let x in result){
                                        labels.push(x);
                                        series.push(result[x]);
                                        if(result[x]>max)
                                                max=result[x]
                                }

                                if(series.length>7){
                                        let abcd=parseInt((series.length/10).toFixed(0));
                                        console.log("abcd is ",abcd,series.length);
                                        setOptions({...options,axisX: {...options.axisX,
                                                        labelInterpolationFnc: function (value,index) {
                                                                return (index%abcd===0)?value:''
                                                        }}});

                                }

                                setOptions({...options,high: (1.5*max),height: (props.size==='large'?"40vh":"30vh")});
                                setData({labels: labels,series: [series]});
                                console.log({labels: labels,series:[series]})
                        };

                        getData(callback,props.url)
                }

                useEffect(() => {
                        getGraphData();
                }, []);


                return(
                    <GridItem xs={12} md={(props.size==='large')?12:6}>
                            <Card chart>
                                    <CardHeader color={props.color} >
                                            <ChartistGraph
                                                className="ct-chart"
                                                data={data}
                                                type="Line"
                                                options={options}
                                                listener={line.animation}
                                            />
                                    </CardHeader>
                                    <CardBody>
                                            <h3 className={classes.cardTitle}>{props.title}</h3>
                                   </CardBody>
                            </Card>
                    </GridItem>
)
}

export default LineGraphs;
