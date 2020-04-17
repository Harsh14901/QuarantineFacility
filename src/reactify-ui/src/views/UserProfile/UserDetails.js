import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CardFooter from "components/Card/CardFooter";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import styles from "assets/jss/homeStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import IconButton from "@material-ui/core/IconButton";
import {Email, Phone} from "@material-ui/icons";
import HighRiskIcon from "assets/img/icons/HighRiskIcon";
import VipIcon from "assets/img/icons/VipIcon";
import './userDetails.css'
import Dialog from "@material-ui/core/Dialog";
import Transition from "react-transition-group/Transition";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {func} from "prop-types";
import changeUserWard from "PeopleData/changeUserWard";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import TootltipStyles from 'assets/jss/material-kit-react/tooltipsStyle'
import getData from "facility/getData";
import postData from "facility/postData";
import GroupInfo from "views/Groups/GroupInfo";
import changeUserFacility from "facility/changeUserFacility";
import ChangeFacilityDialog from "views/Components/ChangeFacilityDialog";

const useStyles2 = makeStyles(styles2);
const useStyles = makeStyles(styles);
const useStyles3 = makeStyles(TootltipStyles);

const Para = ({text}) => {
        return(
        <p style={{fontSize:"1rem",fontWeight: "300"}}>{text}</p>
        )
};

const SideButton = (props) => {
        return(
            <Button disabled={props.disabled} onClick={props.onClick} size="small" variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>{props.text}</Button>
        )
};

export default function UserDetails(props) {

        const classes2 = useStyles2();
        const classes = useStyles();
        const classes3 = useStyles3();

        const [cardAnimation,setCardAnimation] =useState("cardHidden");
        const [open,setOpen] = useState(false);
        const [facOpen,setFacOpen] = useState(false);

        const [dischargeDialogOpen,setDischargeDialogOpen] = useState(false);
        const [openDialog,setOpenDialog] = useState(false);
        const [selectedGroupDetails,setSelectedGroupDetails] = useState({});

        const [active,setActive] = useState(true);



        const handleDialogClose= () => {
                setOpenDialog(false);
        };

        function openGroupDetails() {
                const callback = res => {
                setSelectedGroupDetails(res);
                setOpenDialog(true);
                };
                console.log("Hi good night",'http://127.0.0.1:8000/groups/'+props.data.group+'/');
                getData(callback,'http://127.0.0.1:8000/groups/'+props.data.group+'/')
        };


        function handleDischargeClose() {
                setDischargeDialogOpen(false)
        }

        function handleDischargeOpen() {
                setDischargeDialogOpen(true)
        }

        function handleClose() {
                setOpen(false)
        }
        function handleWardChange() {
                setOpen(true);
        }

        function handleFacClose() {
                setFacOpen(false)
        }
        function handleFacilityChange() {
                setFacOpen(true);
        }

        function changeWard(id) {
                const callback = result => {
                        console.log("Seems to have changed ward",result)
                };


                changeUserWard(callback,{id:props.data.id,ward_pk: id})
        }


        function changeFacility(pref){
                const callback = result => {
                        console.log("Seems to have changed facility",result)
                };


                changeUserFacility(callback,{id:props.data.id,facility_pk: pref})
        }

        function getPairWard() {
                const callback = result => {
                        console.log(result);
                        let a=result.ward_set[0].id;
                        let b=result.ward_set[1].id;
                        if(a===props.data.ward_pk)
                                changeWard(b);
                        else
                                changeWard(a);

                };
                getData(callback,'http://127.0.0.1:8000/facilities/'+props.data.facility_pk+"/")
        }

        function dischargeUser() {
                const callback= result =>{
                  console.log("Shud have discharged",result);
                        setDischargeDialogOpen(false)
                        props.closeFunc();
                };

                postData(callback,{person: props.data.id},'http://127.0.0.1:8000/discharge/')
        }

        function closeDialog() {
                props.closeFunc();
        }

        function checkActive(){
                if(!props.data.facility_name)
                        props.data.facility_name='Discharged';
                if(props.data.facility_name==='Discharged')
                        setActive(false);
                console.log("Need backup",active)
        }

        setTimeout(function() {
                setCardAnimation("");
        }, 700);

        useEffect(()=> {
             checkActive();
        });

        return(
            <div>
            <Card className={classes2[cardAnimation]}>
                    <form className={classes2.form}>
                            <CardHeader color="primary" className={classes2.cardHeader}>
                                    <div>
                                    <h4>{props.data.name}</h4>
                                    {props.data.vip?<VipIcon style={{marginRight: "30px"}}fontSize="large"/>:null}
                                    {(props.data.risk==='high')?<HighRiskIcon fontSize="large"/>:null}
                                    </div>
                            </CardHeader>
                            <CardBody>
                                    <div style={{width:"400px"}}>
                                    <div>
                                            <GridContainer>
                                                    <GridItem xs={12}>
                                                            <Para text={"User id:- " + props.data.code}/>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                            <Para text={"Age:- " + props.data.age}/>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                            {(props.data.gender!=='other')?<Para text={"Gender:- " + props.data.gender}/>:null}
                                                    </GridItem>
                                            </GridContainer>
                                            <div style={{display: "flex"}}>
                                                    <Para text={"Ward Category:- " + ((props.data.risk==='high') ? 1 : 2)}/>
                                                    <SideButton disabled={!active} onClick={handleWardChange} text={"Shift to Ward "+(props.data.risk==='high'?2:1)}/>
                                            </div>
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                                    <Para text={"Facility Enrolled:- " + props.data.facility_name}/>
                                                    <SideButton  disabled={!active} onClick={handleFacilityChange} text={"Change Facility"}/>
                                            </div>
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                                    <Para text={"Group ID:- " + props.data.group}/>
                                                    <SideButton onClick={openGroupDetails} text={"View Group Details"}/>
                                            </div>
                                            <Para text={"Address:- " + props.data.address}/>
                                            <Para text={"Date of Admission:- " + props.data.doa}/>
                                    </div>
                                            {props.data.number?
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                            <Para style={{fontSize: "1rem"}} text={"Contact Number:-\t" + props.data.number}/>
                                                    <a href={"tel:+91"+props.data.number} target="_blank" style={{marginLeft: "auto",marginTop:"10px"}}>
                                                            <Tooltip
                                                                id="tooltip-bottom"
                                                                title={<p style={{fontSize: "14px"}}>{"Contact: +91 " +props.data.number}</p>}
                                                                placement="bottom"
                                                                TransitionComponent={Zoom}
                                                                classes={{ tooltip: classes3.tooltip }}
                                                            >
                                                                    <Phone color="primary" />
                                                            </Tooltip>
                                                    </a>
                                            </div>:null}
                                            {props.data.email?
                                                <div style={{display: "flex",marginTop:"10px"}}>
                                                <Para text={"Email:-\t" + props.data.email}/>
                                                        <a href={"mailto:"+props.data.email} target="_blank" style={{marginLeft: "auto",marginTop:"10px"}}>
                                                                <Tooltip
                                                                    id="tooltip-bottom"
                                                                    title={<p style={{fontSize: "14px"}}>{props.data.email}</p>}
                                                                    placement="bottom"
                                                                    TransitionComponent={Zoom}
                                                                    classes={{ tooltip: classes3.tooltip }}
                                                                >
                                                                        <Email color="primary" />
                                                                </Tooltip>
                                                        </a>
                                                </div>
                                                :null}

                                    </div>
                            </CardBody>
                            <CardFooter className={classes2.cardFooter}>
                                    <Button onClick={closeDialog} className={classes.submitButton}>
                                            CLOSE
                                    </Button>
                                    <Button disabled={!active} onClick={handleDischargeOpen} className={classes.submitButton}>
                                            DISCHARGE
                                    </Button>
                            </CardFooter>
                    </form>
            </Card>


                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                            <DialogTitle id="alert-dialog-slide-title">{"Change User's Ward?"}</DialogTitle>
                            <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                            {"Are you sure you want to change "+props.data.name+"'s ward?"}
                                    </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                            Cancel
                                    </Button>
                                    <Button onClick={getPairWard} color="primary">
                                            Yes, Change Ward
                                    </Button>
                            </DialogActions>
                    </Dialog>

                    <Dialog
                        open={dischargeDialogOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleDischargeClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                            <DialogTitle id="alert-dialog-slide-title">{"Discharge User?"}</DialogTitle>
                            <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                            {"Are you sure you want to discharge "+props.data.name+" ?"}
                                    </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                    <Button onClick={handleDischargeClose} color="primary">
                                            Cancel
                                    </Button>
                                    <Button onClick={dischargeUser} color="primary">
                                            Yes, Discharge
                                    </Button>
                            </DialogActions>
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

                    <Dialog
                        open={facOpen}
                        PaperProps={{
                                style: {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        scrollbarColor: "transparent"
                                },
                        }}
                        onClose={handleFacClose}
                    >
                            <ChangeFacilityDialog submitFunc={changeFacility} closeFunc={handleFacClose} data={[props.data.latitude,props.data.longitude]}/>

                    </Dialog>

            </div>
        )
};

