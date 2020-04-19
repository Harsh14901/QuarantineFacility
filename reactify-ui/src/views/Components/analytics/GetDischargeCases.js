import React from "react";
import LineGraphs from "views/Components/analytics/LineGraphs";
import {DOMAIN} from "variables/Constants";

export function TotalDischargeCaseGraph(props){
        return(
            <LineGraphs title={"Discharged Cases"} url={DOMAIN + '/analytics/total_discharges/'} color="danger"/>
        )
}

export function TotalCasesGraph(props) {
        return(
            <LineGraphs title={"Total Cases"} url={DOMAIN + '/analytics/total_cases/'} color="success" size="large"/>
        )
}

export function ActiveCasesGraph() {
        return(
            <LineGraphs title={"Active Cases"} url={DOMAIN + '/analytics/active_cases/'} color="info" />
        )
}

export default function AverageDischargeCases() {
        return(
            <LineGraphs title="Average DischargeTime" color="danger" url={DOMAIN + '/analytics/avg_discharge_time/'}/>
        )
}
