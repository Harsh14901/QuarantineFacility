import React, {useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import 'assets/css/chartist.css'

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import AverageDischargeCases, {
        ActiveCasesGraph,
        TotalCasesGraph,
        TotalDischargeCaseGraph
} from "views/Components/analytics/GetDischargeCases";
import {AgeGraph, GenderGraph, NewCasesGraph, NewDischargesGraph} from "views/Components/analytics/GetNewCasesGraph";
import LineGraphs from "views/Components/analytics/LineGraphs";
import DonutGraph from "views/Components/analytics/DonutGraph";
import ActiveVsDischargeGraph from "views/Components/analytics/ActiveVsDischargeGraph";
import {TextField} from "@material-ui/core";
import { useCookies } from 'react-cookie';
import SnacbarNotification from "views/Components/SnacbarNotification";



const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [notif,setNotif] = useState(false);

        console.log(emailsSubscriptionChart.data);
        const [messageOpen,setMessageOpen] = useState(true);
  return (
    <div>
    <GridContainer style={{justifyContent: "center"}}>
            <button onClick={()=> setNotif(true)}>hihiadjisn</button>

            <TotalCasesGraph/>
            <ActiveCasesGraph/>
            <TotalDischargeCaseGraph/>
            <NewCasesGraph/>
            <NewDischargesGraph/>
            <AverageDischargeCases/>
            <ActiveVsDischargeGraph/>
            <AgeGraph/>
            <GenderGraph/>
            <DonutGraph/>

    </GridContainer>
    </div>
  );
}
