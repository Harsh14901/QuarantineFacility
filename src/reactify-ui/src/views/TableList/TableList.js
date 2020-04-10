import React, {forwardRef, useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import GetFacilityData from "facility/GetFacilityData";
import CustomTable from "components/CustomTable";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();




        const [facilityData,setFacilityData]=useState([]);
        const [dataDisplay,setDataDisplay] = useState([]);

        const columnsHeading=[
                { title: 'Facility Name', field: 'name' },
                { title: 'Owner', field: 'owner' },
                { title: 'Address', field: 'address' },
                {
                        title: 'Capacity',
                        field: 'capacity',
                },
        ];
        function getFacilityData() {
                const callback = result => {
                        console.log(result);
                        setFacilityData(result);
                        let details=[];
                        result.map((data) =>{
                                details.push({name:data.name,owner:data.owner,address:data.address,capacity:data.capacity})
                        });
                        setDataDisplay(details);
                };
                GetFacilityData(callback)
        }

        useEffect(() => {
                getFacilityData();
        }, []);




        return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
                    Facilities Details
            </h4>
            <p className={classes.cardCategoryWhite}>
                    List of all centres
            </p>
          </CardHeader>
          <CardBody>
                  <CustomTable title="Facility Details" columns={columnsHeading} data={dataDisplay}/>

          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
