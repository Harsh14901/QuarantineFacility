import React from "react";
import LineGraphs from "views/Components/analytics/LineGraphs";

export function TotalDischargeCaseGraph(props){
        return(
            <LineGraphs title={"Discharged Cases"} url='http://127.0.0.1:8000/analytics/total_discharges/' color="success"/>
        )
}

export function TotalCasesGraph(props) {
        return(
            <LineGraphs title={"Total Cases"} url='http://127.0.0.1:8000/analytics/total_cases/' color="success" size="large"/>
        )
}

export function ActiveCasesGraph() {

}

export default function AverageDischargeCases() {
        return(
            <LineGraphs title="Average DischargeTime" color="success" url='http://127.0.0.1:8000/analytics/avg_discharge_time/'/>
        )
}
