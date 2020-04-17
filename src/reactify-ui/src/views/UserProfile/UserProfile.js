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
import MapExtreme from "views/Maps/MapExtreme";
import Dialog from "@material-ui/core/Dialog";
import UserDetails from "views/UserProfile/UserDetails";

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
        const [openDialog,setOpenDialog] = useState(false);
        const [selectedUserDetails,setSelectedUserDetails] = useState({});

        const columnsHeading=[
                { title: 'User ID', field: 'code'},
                { title: 'Name', field: 'name' },
                { title: 'Age', field: 'age' },
                { title: 'Facility', field: 'facility_name' },
                { title: 'Risk',field: 'risk'},
                {
                        title: 'Date Quarantined',
                        field: 'doa',
                },
        ];
        function getPeopleData() {
                const callback = result => {
                        console.log(result);
                        setPeopleData(result);
                        let details=[];
                         result.map((data,j) =>{
                                 details.push({code:data.code,id:data.id,name:data.name,age:data.age,member_count:-1,gender: data.gender
                                         ,facility_name:data.facility_name,risk: data.risk,doa:data.doa,number: data.contact_num,email:data.email
                                 ,vip: data.vip,facility_pk:data.facility_pk,group: data.group,address: data.address,latitude:data.latitude,longitude:data.longitude})
                         });
                        setDataDisplay(details);
                };
                GetPeopleData(callback)
        }


        function handleDialogClose(){
                setOpenDialog(false)
        }

        function openDetails(data){
                setSelectedUserDetails(data);
                setOpenDialog(true)
        }

        useEffect(() => {
                getPeopleData();
        }, []);




        return (
            <div>
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
                                            <CustomTable title="People Details" openDetails={openDetails} columns={columnsHeading} data={dataDisplay}/>

                                    </CardBody>
                            </Card>
                    </GridItem>
            </GridContainer>



                    <Dialog
                        open={openDialog}
                        PaperProps={{
                                style: {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        scrollbarColor: "transparent"
                                },
                        }}
                        onClose={handleDialogClose}
                    >
                            <UserDetails closeFunc={handleDialogClose} data={selectedUserDetails}/>

                    </Dialog>


            </div>
        );
}
