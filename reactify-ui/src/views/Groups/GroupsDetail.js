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
import GetGroupData from "PeopleData/GetGroupData";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog";
import AddGroupDialog from "views/Components/AddGroupDialog";
import LoginPage from "views/Components/LoginPage";
import PostGroupData from "PeopleData/postGroupData";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import UserDetails from "views/UserProfile/UserDetails";
import GroupInfo from "views/Groups/GroupInfo";
import SnacbarNotification from "views/Components/SnacbarNotification";
import GroupsAddDialog from "views/Components/GroupsAddDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


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

export default function GroupsDetail() {
        const classes = useStyles();
        const [groupData,setGroupData]=useState([]);
        const [dataDisplay,setDataDisplay] = useState([]);
        const [groupAddDialog,setGroupAddDialog] = useState(false);
        const [succesAlert,setSuccessAlert] = useState(false);
        const [openDialog,setOpenDialog] = useState(false);
        const [selectedGroupDetails,setSelectedGroupDetails] = useState({});
        const [notif,setNotif] = useState(false);
        const [loading,setLoading] = useState(false);


        function handleDialogClose(){
                setOpenDialog(false);

        }

        function openDetails(data){
                setSelectedGroupDetails(data);
                setOpenDialog(true)
        }

        const columnsHeading=[
                { title: 'ID', field: 'id' },
                { title: 'Category', field: 'category' },
                { title: 'Active Group Members', field: 'active' },
                { title: 'All Group Members', field: 'count' },
                { title: 'People with high Risk',field: 'risk'},
                // {
                //         title: 'Date Quarantined',
                //         field: 'date',
                // },
        ];
        function getGroupsData() {
                const callback = result => {
                        setLoading(false);
                        // // console.log(result);
                        setGroupData(result);
                        let details=[];
                        result.map((data) =>{
                                let high=0;
                                let active=0;
                                data.person_set.map((data)=>{
                                        if(data.facility_name)
                                                active+=1;
                                        if(data.risk==="high")
                                                high++
                                });
                                details.push({id:data.id,category:data.category,count:data.count
                                        ,risk: high,date:"",person_set:data.person_set,active:active})
                        });
                        details.sort(function(a,b){ return b.active-a.active});
                        setDataDisplay(details);
                };
                setLoading(true);
                GetGroupData(callback)
        }

        useEffect(() => {
                getGroupsData();
        }, []);

        const handleClose= () => {
                setGroupAddDialog(false);
        };

        const handleAlertClose = () =>{
                setSuccessAlert(false)
        };

        function handleOpen()  {
                setGroupAddDialog(true);
        }

        function submitDetails(data){
                // // console.log("Submitting",data);
                // // console.log("Hello boy",JSON.stringify(data));
                handleClose();

                const callback = result => {
                        // // console.log(result);
                        // // console.log("Hurrah");
                        let temp=[];
                        temp=[...groupData];
                        setGroupData(temp.concat(result));
                        let details=[];
                        result.map((data) =>{
                                let high=0;
                                data.person_set.map((data)=>{
                                        if(data.risk==="high")
                                                high++
                                });
                                details.push({id:data.id,category:data.category,count:data.count
                                        ,risk: high,date:""})
                        });
                        setDataDisplay(dataDisplay.concat(details));
                        setSuccessAlert(true)

                };
                PostGroupData(callback,data)

        }




        return (
            <div >
                    <div  style={{marinLeft:"100px"}}>
                    <Fab variant="extended" color="primary" onClick={handleOpen}>
                            <AddIcon className={classes.extendedIcon} />
                            Add Group
                    </Fab>
                    </div>
            <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                    <CardHeader color="primary">
                                            <h4 className={classes.cardTitleWhite}>
                                                    Groups' Details
                                            </h4>
                                            <p className={classes.cardCategoryWhite}>
                                                    Quarantined Groups
                                            </p>
                                    </CardHeader>
                                    <CardBody>
                                            <CustomTable title="Groups' Details" openDetails={openDetails} columns={columnsHeading} data={dataDisplay}/>

                                    </CardBody>
                            </Card>
                    </GridItem>
            </GridContainer>
                    <Dialog
                        open={groupAddDialog}
                        PaperProps={{
                                style: {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        scrollbarColor: "transparent"
                                },
                        }}
                        onClose={handleClose}
                    >
                            <GroupsAddDialog submitFunc={submitDetails}/>

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
                            <GroupInfo closeFunc={handleDialogClose} data={selectedGroupDetails}/>

                    </Dialog>
                    <Snackbar open={succesAlert} autoHideDuration={6000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success">
                                    Group Added Successfully
                            </Alert>
                    </Snackbar>
                    <SnacbarNotification setOpen={setNotif} text={"Group has been discharged Successfully"} open={notif}/>
                    <Backdrop open={loading} style={{zIndex: "100"}} onClick={() => setLoading(false)}>
                            <CircularProgress color="inherit" />
                    </Backdrop>
            </div>
        );
}
