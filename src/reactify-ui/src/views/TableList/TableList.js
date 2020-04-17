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
import StatDetailCard from "views/Components/StatDetailCard";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {func} from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import AddFacilityDialog from "views/Components/AddFacilityDialog";
import PostData from "facility/postData";
import MapExtreme from "views/Maps/MapExtreme";
import GroupInfo from "views/Groups/GroupInfo";
import FacilityDetails from "views/TableList/FacilityDetails";

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
        const [facilityTotalCapacity,setFacilityTotalCapacity] =useState("0/0");
        const [ward1TotalCapacity,setWard1TotalCapacity] = useState("0/0");
        const [ward2TotalCapacity,setWard2TotalCapacity] = useState("0/0");
        const [addFacilityDialog,setAddFacilityDialog] = useState(false);
        const [successAlert,setSuccessAlert] =useState(false);
        const [latLong,setLatLong] = useState({lat:31,lng:80});

        const [openDialog,setOpenDialog] = useState(false);

        const [selectedFacDetails,setSelectedFacDetails] = useState({});


        function handleDialogClose(){
                setOpenDialog(false)
        }

        function openDetails(data){
                setSelectedFacDetails(data);
                setOpenDialog(true)
        }

        const columnsHeading=[
                { title: 'Facility Name', field: 'name' },
                { title: 'Owner', field: 'owner' },
                { title: 'Address', field: 'address' },
                {
                        title: 'Occupied/Total Capacity',
                        field: 'capacity',
                },
        ];

        function handleAlertClose(){
                setSuccessAlert(true)
        }
        function handleClose(){
                setAddFacilityDialog(false)
        }
        function handleOpen(){
                setAddFacilityDialog(true)
        }

        function getFacilityData() {
                const callback = result => {
                        console.log(result);
                        setFacilityData(result);
                        let details=[];
                        let totalCap=0;
                        let totalOccup=0;
                        let totalWard2Cap=0;
                        let  totalWard2Occup=0;
                        let totalWard1Cap=0;
                        let  totalWard1Occup=0;
                        result.map((data) =>{
                                data.ward_set.map((res) => {
                                        if(res.category==="1"){
                                                totalWard1Cap+=res.capacity;
                                                totalWard1Occup+=res.occupant_count;
                                        }
                                        else if(res.category==="2"){
                                                totalWard2Cap+=res.capacity;
                                                totalWard2Occup+=res.occupant_count;
                                        }
                                });
                                totalCap+=data.capacity;
                                totalOccup+=data.occupant_count;
                                details.push({name:data.name,owner:data.owner,address:data.address,capacity:data.occupant_count+"/"+data.capacity,id:data.id,ward_set:data.ward_set})
                        });
                        setFacilityTotalCapacity(totalOccup+" / "+totalCap);
                        setWard1TotalCapacity(totalWard1Occup+"/"+totalWard1Cap);
                        setWard2TotalCapacity(totalWard2Occup+"/"+totalWard2Cap);
                        setDataDisplay(details);
                };
                GetFacilityData(callback)
        }

        useEffect(() => {
                getFacilityData();
        }, []);


        function submitDetails(data){
                const callback = result => {
                        console.log("this is result",result);
                        setSuccessAlert(true);
                        handleClose();
                };
                console.log("submit detaisl",JSON.stringify(data));
                PostData(callback,data,'http://127.0.0.1:8000/rooms/')

        }



        return (
            <div>
                    <GridContainer justifyContent={"center"}>
                            <GridItem xs={12} sm={12} md={4}>
                                    <StatDetailCard graph title="Total Capacity" data={facilityTotalCapacity} status={"Just Updated"} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                    <StatDetailCard graph title="Ward 1 Capacity" color="danger" data={ward1TotalCapacity} status={"Just Updated"} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                    <StatDetailCard graph  title="Ward 2 Capacity" color="success" data={ward2TotalCapacity} status={"Just Updated"} />
                            </GridItem>
                    </GridContainer>
                    <Fab variant="extended" color="primary" onClick={handleOpen}>
                            <AddIcon className={classes.extendedIcon} />
                            Add Facility
                    </Fab>
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
                  <CustomTable title="Facility Details" openDetails={openDetails} columns={columnsHeading} data={dataDisplay}/>

          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
                    <Dialog
                        open={addFacilityDialog}
                        PaperProps={{
                                style: {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        scrollbarColor: "transparent"
                                },
                        }}
                        onClose={handleClose}
                    >
                            <AddFacilityDialog submitFunc={submitDetails}/>

                    </Dialog>
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
                            <FacilityDetails closeFunc={handleDialogClose} data={selectedFacDetails}/>

                    </Dialog>
                    <Snackbar open={successAlert} autoHideDuration={6000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success">
                                    Facility Added Successfully
                            </Alert>
                    </Snackbar>
            </div>

  );
}
