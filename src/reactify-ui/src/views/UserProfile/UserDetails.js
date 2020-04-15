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

const useStyles2 = makeStyles(styles2);
const useStyles = makeStyles(styles);


export default function UserDetails(props) {

        const classes2 = useStyles2();
        const classes = useStyles();

        const [cardAnimation,setCardAnimation] =useState("cardHidden");

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
                                                            <p>{"User id:- "+props.data.id}</p>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                            <p>{"Age:- "+props.data.age}</p>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                            {(props.data.gender!=='other')?<p>{"Gender:- "+props.data.gender}</p>:null}
                                                    </GridItem>
                                            </GridContainer>
                                            <div style={{display: "flex"}}>
                                                    <p>{"Ward Category:- "+props.data.ward}</p>
                                                    <Button variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>{"Change Ward to "+(props.data.ward==='1')?2:1}</Button>
                                            </div>
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                                    <p>{"Facility Enrolled:- "+props.data.facility}</p>
                                                    <Button size="small" variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>Change Facility</Button>
                                            </div>
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                                    <p>{"Group ID:- "+props.data.facility}</p>
                                                    <Button size="small" variant="outlined" color="primary" style={{marginLeft: "auto",fontSize: "0.7rem"}}>View Group Details</Button>
                                            </div>
                                            <p>{"Address:- "+props.data.address}</p>
                                            <p>{"Date of Admission:- "+ props.data.date}</p>
                                    </div>
                                            {props.data.number?
                                            <div style={{display: "flex",marginTop:"10px"}}>
                                            <p>{"Contact Number:-\t"+props.data.number}</p>
                                            <IconButton style={{marginLeft: "auto"}} color="primary" aria-label="Contact" component="span">
                                                    <Phone />
                                            </IconButton>
                                            </div>:null}
                                            {props.data.email?
                                                <div style={{display: "flex",marginTop:"10px"}}>
                                                <p>{"Email:-\t"+props.data.email}</p>
                                            <IconButton style={{marginLeft: "auto"}} color="primary" aria-label="Contact" component="span">
                                                    <Email />
                                            </IconButton>
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
            </div>
        )
};

