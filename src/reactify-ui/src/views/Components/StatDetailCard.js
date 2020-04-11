import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import Icon from "@material-ui/core/Icon";
import CardFooter from "components/Card/CardFooter";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Card from "components/Card/Card";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/StatDetailCardStyle'
import Store from "@material-ui/icons/Store";
import Update from "@material-ui/icons/Update";
import {emailsSubscriptionChart} from "variables/charts";
import ChartistGraph from "react-chartist";
import {Doughnut} from 'react-chartjs-2';



const useStyles= makeStyles(styles);

function StatDetailCard(props){
        const classes=useStyles();
        let data={};
        console.log("Yeahh",props.graphData);
        if(props.graph){
                const a=parseInt(props.data.substring(0,props.data.indexOf("/")));
                const b=parseInt(props.data.substring(props.data.indexOf("/")+1));
                data = {
                labels: [
                        'Filled',
                        'Vacant'
                ],
                datasets: [{

                        data: [Math.round( a/b*100),Math.round((b-a)/b*100)],
                        backgroundColor: [
                                '#FF2354',
                                '#36A2EB',
                        ],
                        hoverBackgroundColor: [
                                '#FF2344',
                                '#36B2EB',
                        ],

                }],
                        text: "HI"
        };}
        return(
            <Card>
                    <CardHeader color={props.color?props.color:"info"} stats icon>
                            <CardIcon color={props.color?props.color:"info"}>
                                    {props.icon?props.icon:<Store/>}
                            </CardIcon>
                            <p className={classes.cardCategory}>{props.title}</p>
                            <h3 className={classes.cardTitle}>{props.data}</h3>
                            {props.graph?<Doughnut data={data} />:null}
                            {/*<ChartistGraph*/}
                            {/*    className="ct-chart"*/}
                            {/*    data={data}*/}
                            {/*    type="Donut"*/}
                            {/*    // options={emailsSubscriptionChart.options}*/}
                            {/*    // responsiveOptions={emailsSubscriptionChart.responsiveOptions}*/}
                            {/*    // listener={emailsSubscriptionChart.animation}*/}
                            {/*/>*/}
                    </CardHeader>
                    <CardFooter stats>
                            <div className={classes.stats}>
                                    {props.statusIcon?props.statusIcon:<Update/>}
                                    {props.status}
                            </div>
                    </CardFooter>
            </Card>
        )
}

export default StatDetailCard
