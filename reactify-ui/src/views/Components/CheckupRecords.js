import AddFacilityDialog from "views/Components/AddFacilityDialog";
import Dialog from "@material-ui/core/Dialog";
import React, {useEffect, useState} from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CardFooter from "components/Card/CardFooter";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import styles from "assets/jss/homeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import getData from "facility/getData";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Tooltip from "@material-ui/core/Tooltip";
import LaunchIcon from "@material-ui/icons/Launch";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import postData from "facility/postData";
import {DOMAIN} from "variables/Constants";
import SnacbarNotification from "views/Components/SnacbarNotification";


const useStyles2 = makeStyles(styles2);



const useStyles = makeStyles(styles);

export default function CheckupRecords(props){

        const classes= useStyles();
        const classes2= useStyles2();

        const [cardAnimation, setCardAnimation] = React.useState("cardHidden");
        const [notif,setNotif] = useState(false);

        const [checkupDetails,setCheckupDetails] = useState({doctor: "",date: "",next_checkup_date: "",health_staus: "Average"});
        const [medicinesList,setMedicinesList] = useState([]);
        const [userMedicineList,setUserMedicineList] = useState([]);

        const healthCateg = [
                {
                        value: 'Excellent',
                },
                {
                        value: 'Good',
                },
                {
                        value: 'Average',
                },
                {
                        value: 'Risky',
                },
                {
                        value: 'Critical',
                },
        ];


        function handleClose() {
                // props.closeFunc();
        }

        const deleteMed = (idx) => event =>{
                let temp=[...userMedicineList];
                setUserMedicineList(temp.filter(function(value,id){ return id!==idx}));
                console.log("I have deleted this",temp)

        };

        const handleChange = (prop) => (event) => {

                console.log(event.target.value);

                setCheckupDetails({...checkupDetails,[prop]:event.target.value})




        };

        function submitDetails(){

                const callback = res =>{
                        console.log("Checkup details edited",res);
                        setNotif(true)

                };
                let med=[];
                userMedicineList.map((data) =>
                {
                        med.push(data.id)
                });
                let data={person: props.data.id,doctor:checkupDetails.doctor,date:checkupDetails.date,health_status: checkupDetails.healthDetails
                , next_checkup_date: checkupDetails.next_checkup_date,medicines: med};
                postData(callback,data,DOMAIN + '/checkup-records/')


        }

        function getMedicinesList(){
                const callback = res => {
                        setMedicinesList(res);
                        let temp=[];
                        for(let i=0;i<props.data.checkuprecords_set[0].medicines.length;i++){
                                res.map((data)=>{
                                        if(data.id===props.data.checkuprecords_set[0].medicines[i])
                                                temp.push(data)
                                })
                        }
                        setUserMedicineList(temp);
                };
                getData(callback,DOMAIN + '/medicines/')
        }


        setTimeout(function() {
                setCardAnimation("");
        }, 700);


        useEffect(() => {
                getMedicinesList();
                console.log("Look boyssss",props.data.checkuprecords_set);

                if(!props.data.checkuprecords_set[0]){
                         console.log("HAHAHHAHAH")
                }
                else
                        setCheckupDetails(props.data.checkuprecords_set[0]);
                console.log(props.data.checkuprecords_set)
        }, []);


        return(


                    <div className={classes.formDiv}>
                            <GridContainer>
                                    <GridItem xs={12}>
                                            <Card className={classes2[cardAnimation]}>
                                                    <form className={classes2.form}>
                                                            <CardHeader color="primary" className={classes2.cardHeader}>
                                                                    <h4>{props.data.name+" records"}</h4>
                                                            </CardHeader>
                                                            <CardBody>

                                                                    <CustomInput
                                                                        labelText="Doctor..."
                                                                        id="doctor"
                                                                        formControlProps={{
                                                                                fullWidth: true
                                                                        }}
                                                                        inputProps={{
                                                                                value: checkupDetails.doctor,
                                                                                onChange: handleChange("doctor"),
                                                                                type: "text",
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                            <People className={classes2.inputIconsColor} />
                                                                                    </InputAdornment>
                                                                                )
                                                                        }}
                                                                    />
                                                                    <CustomInput
                                                                        labelText="Date..."
                                                                        id="date"
                                                                        formControlProps={{
                                                                                fullWidth: true
                                                                        }}
                                                                        inputProps={{
                                                                                value: checkupDetails.date,
                                                                                type: "text",
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                            <People className={classes2.inputIconsColor} />
                                                                                    </InputAdornment>
                                                                                )
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        style={{marginTop: "6px"}}
                                                                        id="severity"
                                                                        select
                                                                        label="Severity"
                                                                        value={checkupDetails.health_status}
                                                                        onChange={handleChange('health_status')}
                                                                        fullWidth={true}
                                                                        InputProps={{style: {fontSize: "0.9rem"}}}


                                                                    >
                                                                            {healthCateg.map((option) => (
                                                                                <MenuItem  key={option.value} value={option.value}>
                                                                                        {option.value}
                                                                                </MenuItem>
                                                                            ))}
                                                                    </TextField>
                                                                    <CustomInput
                                                                        labelText="Next Checkup Date..."
                                                                        id="check_date"
                                                                        formControlProps={{
                                                                                fullWidth: true
                                                                        }}
                                                                        inputProps={{
                                                                                value: checkupDetails.next_checkup_date,
                                                                                onChange: handleChange("next_checkup_date"),
                                                                                type: "text",
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                            <People className={classes2.inputIconsColor} />
                                                                                    </InputAdornment>
                                                                                )
                                                                        }}
                                                                    />
                                                                    <ExpansionPanel>
                                                                            <ExpansionPanelSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls="panel1a-content"
                                                                                id="panel1a-header"
                                                                            >
                                                                                    Medicines
                                                                            </ExpansionPanelSummary>
                                                                            <ExpansionPanelDetails>

                                                                                    <List style={{width: "100%"}}>
                                                                                            {userMedicineList.map((data,idx) =>
                                                                                                <ListItem>
                                                                                                        <ListItemAvatar>
                                                                                                                <Avatar>
                                                                                                                        <FolderIcon />
                                                                                                                </Avatar>
                                                                                                        </ListItemAvatar>
                                                                                                        <ListItemText
                                                                                                            primary={data.name}
                                                                                                            secondary={'Cost:- ' +data.cost}
                                                                                                        />
                                                                                                        <ListItemSecondaryAction>
                                                                                                                <IconButton onClick={deleteMed(idx)} edge="end" aria-label="delete">
                                                                                                                        <DeleteIcon />
                                                                                                                </IconButton>
                                                                                                        </ListItemSecondaryAction>
                                                                                                </ListItem>,
                                                                                            )}
                                                                                    </List>
                                                                            </ExpansionPanelDetails>
                                                                    </ExpansionPanel>
                                                            </CardBody>
                                                            <CardFooter className={classes2.cardFooter}>
                                                                    <Button onClick={() => props.closeFunc()} className={classes.submitButton}>
                                                                            {"BACK"}
                                                                    </Button>
                                                                    <Button onClick={submitDetails} className={classes.submitButton}>
                                                                            {"SAVE CHANGES"}
                                                                    </Button>
                                                            </CardFooter>
                                                    </form>
                                            </Card>
                                    </GridItem>
                            </GridContainer>
                            <SnacbarNotification open={notif} text={"Checkup Record Added Successfully"}/>
                    </div>



        )




}
