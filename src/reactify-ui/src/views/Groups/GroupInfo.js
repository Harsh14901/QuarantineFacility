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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import LaunchIcon from "@material-ui/icons/Launch";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserDetails from "views/UserProfile/UserDetails";


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
            <Button onClick={props.onClick} size="small" variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>{props.text}</Button>
        )
};

export default function GroupInfo(props) {

        const classes2 = useStyles2();
        const classes = useStyles();
        const classes3 = useStyles3();

        const [cardAnimation,setCardAnimation] =useState("cardHidden");
        const [open,setOpen] = useState(false);
        const [dischargeDialogOpen,setDischargeDialogOpen] = useState(false);
        const [openDialog,setOpenDialog] = useState(false);
        const [selectedUserDetails,setSelectedUserDetails] = useState({});



        const handleDialogClose= () => {
                setOpenDialog(false);
        };

        const openUserDetails = (j) => {
                setSelectedUserDetails(props.data.person_set[j]);
                setOpenDialog(true);
        };

        function handleDischargeOpen() {
                setDischargeDialogOpen(true)
        }

        function handleDischargeClose() {
                setDischargeDialogOpen(false)
        }

        function handleClose() {
                setOpen(false)
        }




        function dischargeGroup() {
                const callback= result =>{
                        console.log("Shud have discharged",result);
                        setDischargeDialogOpen(false);
                        props.closeFunc();
                };

                postData(callback,{group: props.data.id},'http://127.0.0.1:8000/discharge_group/')
        }

        function closeDialog() {
                props.closeFunc();
        }
        setTimeout(function() {
                setCardAnimation("");
        }, 700);

        useEffect(() => {
                console.log("hi",props.data)
        }, []);

        return(
            <div>
                    <Card className={classes2[cardAnimation]}>
                            <form className={classes2.form}>
                                    <CardHeader color="primary" className={classes2.cardHeader}>
                                            <div>
                                                    <h4>{"Group Details"}</h4>
                                                    {props.data.person_set[0].vip?<VipIcon style={{marginRight: "30px"}}fontSize="large"/>:null}
                                            </div>
                                    </CardHeader>
                                    <CardBody>
                                            <div style={{width:"400px"}}>
                                                    <div>
                                                            <Para text={"Group id:- " + props.data.id}/>
                                                            <Para text={"Category:- " + props.data.category}/>
                                                            <Para text={"Count:- " + props.data.count}/>
                                                            <Para text={"Address:- " + props.data.address}/>
                                                    </div>
                                                    <ExpansionPanel>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                    View all Members' details
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <div style={{width: "100%"}}>
                                                                    {props.data.person_set.map((data,j) =>
                                                                        <div style={{display: "flex",width: "100%",marginTop:"10px"}}>
                                                                                <Para style={{fontSize: "1rem"}} text={data.name}/>
                                                                                <Tooltip
                                                                                    id="tooltip-left"
                                                                                    title="Open User Details"
                                                                                    placement="top"
                                                                                    classes={{ tooltip: classes3.tooltip }}
                                                                                >
                                                                                        <LaunchIcon
                                                                                            onClick={() => openUserDetails(j)}
                                                                                            color="primary"
                                                                                            variant="contained"
                                                                                            style={{textTransform: 'none',marginLeft:"auto",marginTop:"18px"}}
                                                                                            size="small"
                                                                                        />
                                                                                </Tooltip>
                                                                        </div>)}
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                    </ExpansionPanel>


                                            </div>
                                    </CardBody>
                                    <CardFooter className={classes2.cardFooter}>
                                            <Button onClick={closeDialog} className={classes.submitButton}>
                                                    CLOSE
                                            </Button>
                                            <Button onClick={handleDischargeOpen} className={classes.submitButton}>
                                                    DISCHARGE
                                            </Button>
                                    </CardFooter>
                            </form>
                    </Card>


                    <Dialog
                        open={dischargeDialogOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleDischargeClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                            <DialogTitle id="alert-dialog-slide-title">{"Discharge Group?"}</DialogTitle>
                            <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                            {"Are you sure you want to discharge this group?"}
                                    </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                    <Button onClick={handleDischargeClose} color="primary">
                                            Cancel
                                    </Button>
                                    <Button onClick={dischargeGroup} color="primary">
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
                            <UserDetails closeFunc={handleDialogClose} data={selectedUserDetails}/>

                    </Dialog>

            </div>
        )
};

