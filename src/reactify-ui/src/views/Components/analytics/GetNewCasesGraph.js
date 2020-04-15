import BarGraph from "views/Components/analytics/BarGraph";
import React from "react";

export function NewCasesGraph() {
        return(
                <BarGraph title={"New Cases"} url='http://127.0.0.1:8000/analytics/new_cases/'/>
        )
}

function processAgeGraph(data) {
        let array = new Array(12);
        array.fill(0);
        for (let x in data){
                array[~~(parseInt(x)/10)]+=data[x];
        }
        let max=0;
        let biggest=0;
        for (let i=0;i<12;i++){
                if(array[i]===0){
                        continue;}
                biggest=i;
                if(array[i]>max)
                        max=array[i]
        }
        let series=array.slice(0,biggest+1);
        let labels = new Array(biggest+1);
        labels.fill("");
        for (let i=0;i<biggest+1;i++){
                labels[i]=(i*10)+"-"+(i*10+10);
        }
        return {labels:labels,series:series,max:max}

}

function processGenderData(data) {
        let m=data.male;
        let f=data.female;
        let other=data.other;
        if(!other)
                other=0;
        let total=m+f+other;
        m=(m*100/total).toFixed(1);
        f=(f*100/total).toFixed(1);
        other=(other*100/total).toFixed(1);
        if(other===0){
                return {labels: ['Male','Female'],series: [m,f],max:66}
        }
        return {labels: ['Male','Female','Unknown'],series: [m,f,other],max:66}
}

export function AgeGraph() {
        return(
            <BarGraph title="Number of Cases vs Age" noCategory dataProcessFunction={processAgeGraph} url='http://127.0.0.1:8000/analytics/cases_vs_age/'/>
        )
}

export function GenderGraph() {
        return(
            <BarGraph horizontal title="Cases based on Gender" noCategory dataProcessFunction={processGenderData} url='http://127.0.0.1:8000/analytics/cases_vs_gender/'/>
        )

}

export function NewDischargesGraph(){
        return(
            <BarGraph title="Daily People Discharged" url='http://127.0.0.1:8000/analytics/discharge_count/'/>
        )
}
