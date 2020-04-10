import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import GetFacilityData from "facility/GetFacilityData";
import CustomTable from "components/CustomTable";
import GetPeopleData from "PeopleData/GetPeopleData";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
        const [peopleData,setPeopleData]=useState([]);
        const [dataDisplay,setDataDisplay] = useState([]);

        const columnsHeading=[
                { title: 'Name', field: 'name' },
                { title: 'Age', field: 'age' },
                { title: 'Group Members', field: 'member_count' },
                { title: 'Facility', field: 'facility' },
                { title: 'Risk',field: 'risk'},
                {
                        title: 'Date Quarantined',
                        field: 'date',
                },
        ];
        function getPeopleData() {
                const callback = result => {
                        console.log(result);
                        setPeopleData(result);
                        let details=[];
                         result.map((data) =>{
                                 details.push({id:data.id,name:data.name,age:data.age,member_count:-1
                                         ,facility:"",risk: data.risk,"date":"",number: data.contact_num,email:data.email})
                         });
                        setDataDisplay(details);
                };
                GetPeopleData(callback)
        }

        useEffect(() => {
                getPeopleData();
        }, []);




        return (
            <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                    <CardHeader color="primary">
                                            <h4 className={classes.cardTitleWhite}>
                                                    User's Details
                                            </h4>
                                            <p className={classes.cardCategoryWhite}>
                                                    List of People Quarantined
                                            </p>
                                    </CardHeader>
                                    <CardBody>
                                            <CustomTable title="People Details" columns={columnsHeading} data={dataDisplay}/>

                                    </CardBody>
                            </Card>
                    </GridItem>
            </GridContainer>
        );
}
