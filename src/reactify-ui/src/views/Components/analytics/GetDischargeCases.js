import React from "react";
import LineGraphs from "views/Components/analytics/LineGraphs";

export function TotalDischargeCaseGraph(props){
        return(
            <LineGraphs title={"Discharged Cases"} url='http://127.0.0.1:8000/analytics/total_discharges/' color="danger"/>
        )
}

export function TotalCasesGraph(props) {
        return(
            <LineGraphs title={"Total Cases"} url='http://127.0.0.1:8000/analytics/total_cases/' color="success" size="large"/>
        )
}

export function ActiveCasesGraph() {
        return(
            <LineGraphs title={"Active Cases"} url={'http://127.0.0.1:8000/analytics/active_cases/'} color="info" />
        )
}

export default function AverageDischargeCases() {
        return(
            <LineGraphs title="Average DischargeTime" color="danger" url='http://127.0.0.1:8000/analytics/avg_discharge_time/'/>
        )
}
