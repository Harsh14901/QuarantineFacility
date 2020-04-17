import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import VipIcon from "assets/img/icons/VipIcon";
import CardBody from "components/Card/CardBody";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Tooltip from "@material-ui/core/Tooltip";
import LaunchIcon from "@material-ui/icons/Launch";
import CardFooter from "components/Card/CardFooter";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Transition from "react-transition-group/Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import UserDetails from "views/UserProfile/UserDetails";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import DonutGraph from "views/Components/analytics/DonutGraph";
import styles from "assets/jss/homeStyles";
import AddRoomDialog from "views/Components/AddRoomDialog";
import {func} from "prop-types";

const useStyles2 = makeStyles(styles2);
const useStyles = makeStyles(styles);


const Para = ({text}) => {
        return(
            <p style={{fontSize:"1rem",fontWeight: "300"}}>{text}</p>
        )
};

export default function FacilityDetails(props) {

        const classes = useStyles();
        const classes2 = useStyles2();



        const [cardAnimation,setCardAnimation] =useState("cardHidden");
        const [wardDetails,setWardDetails] = useState(null);
        const [openDialog,setOpenDialog] = useState(false);
        const [ward1Id,setWard1Id] = useState(-1);
        const [ward2Id,setWard2Id] = useState(-1);


        function closeDialog(){
                props.closeFunc();
        }

        function addRooms(){

        }

        function handleDialogClose(){
                setOpenDialog(false)
        }

        function submitDetails(data){
                props.submitFunc(data);
                props.closeFunc()

        }

        function setDetails(){
                let  totalWard2Occup=0;
                let totalWardCap=0;
                let  totalWard1Occup=0;
                props.data.ward_set.map((res) => {
                        if(res.category==="1"){
                                totalWardCap+=res.capacity;
                                totalWard1Occup+=res.occupant_count;
                                setWard1Id(res.id)
                        }
                        else if(res.category==="2"){
                                totalWardCap+=res.capacity;
                                totalWard2Occup+=res.occupant_count;
                                setWard2Id(res.id)

                        }
                });
                setWardDetails({"Ward-1":totalWard1Occup,"Ward-2": totalWard2Occup,"vacant":(totalWardCap-totalWard1Occup-totalWard2Occup)})
        }

        setTimeout(function() {
                setCardAnimation("");
        }, 700);

        useEffect(() => {
                console.log(" hello",props.data);
                setDetails();
        }, []);

        return(
            <div>
                    <div>
                            <Card className={classes2[cardAnimation]}>
                                    <form className={classes2.form}>
                                            <CardHeader color="primary" className={classes2.cardHeader}>
                                                    <div>
                                                            <h4>{"Facility Details"}</h4>
                                                    </div>
                                            </CardHeader>
                                            <CardBody>
                                                    <div style={{width:"400px"}}>
                                                            <div>
                                                                    <Para text={"Facility id:- " + props.data.id}/>
                                                                    <Para text={"Facility Name:- " + props.data.name}/>
                                                                    <Para text={"Facility Owner:- " + props.data.owner}/>
                                                                    <Para text={"Facility Address:- " + props.data.address}/>
                                                            </div>

                                                            {wardDetails!==null?<DonutGraph size='large' data={wardDetails}/>:null}


                                                    </div>
                                            </CardBody>
                                            <CardFooter className={classes2.cardFooter}>
                                                    <Button onClick={closeDialog} className={classes.submitButton}>
                                                            CLOSE
                                                    </Button>
                                                    <Button onClick={() => setOpenDialog(true)} className={classes.submitButton}>
                                                            Add Rooms
                                                    </Button>
                                            </CardFooter>
                                    </form>
                            </Card>

                    </div>
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
                            <AddRoomDialog submitFunc={submitDetails} closeFunc={handleDialogClose} ward1Id={ward1Id} ward2Id={ward2Id}/>

                    </Dialog>

            </div>

        )



}

