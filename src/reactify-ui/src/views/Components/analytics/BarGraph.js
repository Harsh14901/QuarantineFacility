import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import ChartistGraph from "react-chartist";
import {dailySalesChart, emailsSubscriptionChart} from "variables/charts";
import CardBody from "components/Card/CardBody";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import CardFooter from "components/Card/CardFooter";
import AccessTime from "@material-ui/icons/AccessTime";
import GridContainer from "components/Grid/GridContainer";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";
import getData from "facility/getData";
import {bar} from "views/Components/analytics/ChartOpAnims";


const useStyles = makeStyles(styles);

function BarGraph(props) {

        const classes=useStyles();


        const [data,setData] = useState({});
        const [increase,setIncrease] = useState(0);
        const [options,setOptions] = useState(bar.options);



        function getGraphData() {
                const callback = result => {
                        let labels=[];
                        let series=[];
                        let max=0;
                        let last=1;
                        let now=0;

                        if(props.dataProcessFunction!==undefined){
                                let res = props.dataProcessFunction(result);
                                max=res.max;
                                labels=res.labels;
                                series=res.series;
                                console.log("HI girls",{labels:[labels],series:series})
                        }
                        else {
                                for (let x in result) {
                                        last = now;
                                        now = result[x];
                                        labels.push(x);
                                        series.push(result[x]);
                                        if (result[x] > max)
                                                max = result[x]
                                }
                        }

                        if(series.length>7){
                                let abcd=parseInt((series.length/10).toFixed(0));
                                console.log("abcd is ",abcd,series.length);
                                setOptions({...options,axisX: {...options.axisX,
                                                labelInterpolationFnc: function (value,index) {
                                                        return (index%abcd===0)?value:''
                                                }}});

                        }

                        let xyzw =props.horizontal?setOptions({...options,horizontalBars: true}):null
                        setOptions({...options,high: (1.5*max)});
                        setData({labels: labels,series: [series]});
                        setIncrease((now/last -1)*100);
                        console.log({labels: labels,series:[series]})
                };

                getData(callback,props.url)
        }

        useEffect(() => {
                getGraphData();
        }, []);


        return(
                        <GridItem xs={12} sm={6} md={6}>
                                <Card chart>
                                        <CardHeader color={props.color}>
                                                <ChartistGraph
                                                    className="ct-chart"
                                                    data={data}
                                                    type="Bar"
                                                    options={options}
                                                    responsiveOptions={bar.responsiveOptions}
                                                    listener={bar.animation}
                                                />
                                        </CardHeader>
                                        <CardBody>
                                                <h4 className={classes.cardTitle}>{props.title}</h4>
                                                {!props.noCategory?
                                                    <p className={classes.cardCategory}>
                <span className={increase>0?classes.successText:classes.lossText}>
                        {increase>0?<ArrowUpward className={classes.upArrowCardCategory} />:<ArrowDownward className={classes.downArrowCardCategory}/> } {Math.abs(increase).toFixed(1)+"%"}
                </span>{" "}
                                                            {(increase>0?" increase":" decrease")+" today"}
                                                    </p>
                                                    :null}
                                        </CardBody>
                                        <CardFooter chart>
                                                <div className={classes.stats}>
                                                        <AccessTime /> Updated Just Now
                                                </div>
                                        </CardFooter>
                                </Card>
                        </GridItem>
        )
}

export default BarGraph
