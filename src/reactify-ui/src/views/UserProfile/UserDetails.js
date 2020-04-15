import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CardFooter from "components/Card/CardFooter";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card";
import React, {useState} from "react";
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

export default function UserDetails(props) {

        const classes2 = useStyles2();
        const classes = useStyles();
        const classes3 = useStyles3();

        const [cardAnimation,setCardAnimation] =useState("cardHidden");
        const [open,setOpen] = useState(false);

        function handleClose() {
                setOpen(false)
        }
        function handleWardChange() {
                setOpen(true);
        }

        function changeWard() {
                const callback = result => {
                        console.log("Seems to have changed ward",result)
                };

                changeUserWard(callback,{id:props.data.id,risk: props.data.risk})
        }

        function dischargeUser() {

        }

        function closeDialog() {
                props.closeFunc();
        }
        setTimeout(function() {
                setCardAnimation("");
        }, 700);

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
                                                            <Para text={"User id:- " + props.data.id}/>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                            <Para text={"Age:- " + props.data.age}/>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                            {(props.data.gender!=='other')?<Para text={"Gender:- " + props.data.gender}/>:null}
                                                    </GridItem>
                                            </GridContainer>
                                            <div style={{display: "flex"}}>
                                                    <Para text={"Ward Category:- " + ((props.data.risk) ? 1 : 2)}/>
                                                    <SideButton onClick={handleWardChange} text={"Shift to Ward "+(props.data.risk?2:1)}/>
                                            </div>
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                                    <Para text={"Facility Enrolled:- " + props.data.facility}/>
                                                    <Button size="small" variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>Change Facility</Button>
                                            </div>
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                                    <Para text={"Group ID:- " + props.data.facility}/>
                                                    <Button size="small" variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>View Group Details</Button>
                                            </div>
                                            <Para text={"Address:- " + props.data.address}/>
                                            <Para text={"Date of Admission:- " + props.data.date}/>
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
                                    <Button onClick={dischargeUser} className={classes.submitButton}>
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
                                    <Button onClick={changeWard} color="primary">
                                            Yes, Change Ward
                                    </Button>
                            </DialogActions>
                    </Dialog>


            </div>
        )
};

