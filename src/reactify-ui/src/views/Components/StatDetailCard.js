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


const useStyles= makeStyles(styles);

function StatDetailCard(props){
        const classes=useStyles();
        return(
            <Card>
                    <CardHeader color={props.color?props.color:"info"} stats icon>
                            <CardIcon color={props.color?props.color:"info"}>
                                    {props.icon?props.icon:<Store/>}
                            </CardIcon>
                            <p className={classes.cardCategory}>{props.title}</p>
                            <h3 className={classes.cardTitle}>{props.data}</h3>
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
