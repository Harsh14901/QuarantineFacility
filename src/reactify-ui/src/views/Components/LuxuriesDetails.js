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
import MedicineIcon from "assets/img/icons/MedicineIcon";
import CustomTabs from "components/CustomTabs/CustomTabs";
import DialogActions from "@material-ui/core/DialogActions";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import MapExtreme from "views/Maps/MapExtreme";
import {Earth} from "leaflet/src/geo/crs/CRS.Earth";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Add} from "@material-ui/icons";
import LuxuriesIcon from "assets/img/icons/LuxuriesIcon";


const useStyles2 = makeStyles(styles2);



const useStyles = makeStyles(styles);

const Para = ({text}) => {
        return(
            <p style={{fontSize:"1rem",fontWeight: "300"}}>{text}</p>
        )
};


export default function LuxuriesDetails(props){

        const classes= useStyles();
        const classes2= useStyles2();

        const [cardAnimation, setCardAnimation] = React.useState("cardHidden");
        const [notif,setNotif] = useState(false);
        const [luxuriesList,setLuxuriesList] = useState([]);
        const [luxuryPicker,setLuxuryPicker] = useState(false);
        const [selectedLux,setSelectedLux] = useState(1);




        const deleteLuxury = (idx) => event =>{
                let temp=[...checkupDetails];
                temp[checkupDetails.length-1].medicines=temp[checkupDetails.length-1].medicines.filter(function(value,id){ console.log(id,"hi",idx); return id!==idx});
                console.log("medicinesList is", temp[checkupDetails.length-1].medicines);
                setCheckupDetails(temp);
                console.log("I have deleted this",idx)

        };


        function submitDetails(){

                const callback = res =>{
                        console.log("Checkup details edited",res);
                        setNotif(true)

                };
                let med=[];

                let len =checkupDetails.length-1;
                 let data={person: props.data.id,doctor:checkupDetails[len].doctor,
                         health_status: checkupDetails[len].health_staus
                 , next_checkup_date: checkupDetails[len].next_checkup_date,medicines: checkupDetails[len].medicines};
                 console.log("I am going to post this data",JSON.stringify(data));
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

        function addMedicineToList(){
                let temp=checkupDetails[checkupDetails.length-1].medicines
                if(!temp.includes(selectedMed)) {
                        temp.push(selectedMed);
                        setSelectedMed(1)
                }



        }

        function getMedName(id){
                let name="";
                medicinesList.map((data)=> {
                        // console.log("ids are here",data.id,id);
                        if(data.id===id) {
                                name = data.name;
                                //console.log("name is here",name)
                        }
                        return name
                });
                //console.log(name);
                return name;
        }

        function getMedCost(id){
                let cost="";
                medicinesList.map((data)=> {
                        if(data.id===id)
                                cost=data.cost;
                        return cost
                });
                return cost;
        }

        const handleMedChange = (prop) => (event) => {

                                //setSelectedMed(event.target.value);
                                console.log(prop,event.target.value)

        };

        function handleMedicinePickerChange(){
                setMedicinePicker(true)
        }

        useEffect(() => {
                getMedicinesList();
                // if(!props.data.checkuprecords_set[0]){
                //          console.log("HAHAHHAHAH")
                // }
                 {
                         let temp=[...props.data.checkuprecords_set];
                         temp.push({...defaultCheckup,person:props.data.id});
                        setCheckupDetails(temp);
                }
                console.log("checkup details",checkupDetails);
                checkupDetails.map((data) => {
                        console.log(data)
                })
        }, []);


        return(


                    <div className={classes.formDiv}>
                            <GridContainer>
                                    <GridItem xs={12}>

                                                 <Card className={classes2[cardAnimation]}>
                                                            <CardHeader color="primary" className={classes2.cardHeader}>
                                                                    <h4>{props.data.name+" records"}</h4>
                                                            </CardHeader>
                                                            <CardBody>


                                                                    <ExpansionPanel>
                                                                            <ExpansionPanelSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls="panel1a-content"
                                                                                aria-label="Expand"
                                                                                id="panel1a-header"
                                                                            >
                                                                                    <FormControlLabel
                                                                                        aria-label="Acknowledge"
                                                                                        onClick={(event) => {event.stopPropagation();
                                                                                                handleMedicinePickerChange()
                                                                                        }
                                                                                        }
                                                                                        onFocus={(event) => event.stopPropagation()}
                                                                                        control={<Add />}
                                                                                        label="Medicines"
                                                                                    />
                                                                            </ExpansionPanelSummary>
                                                                            <ExpansionPanelDetails>
                                                                                    <List style={{width: "100%"}}>
                                                                                            {data.medicines.map((data,idx) =>
                                                                                                <ListItem>
                                                                                                        <ListItemAvatar>
                                                                                                                <Avatar>
                                                                                                                        <LuxuriesIcon />
                                                                                                                </Avatar>
                                                                                                        </ListItemAvatar>
                                                                                                        <ListItemText
                                                                                                            primary={getMedName(data)}
                                                                                                            secondary={'Cost:- ' +getMedCost(data)}
                                                                                                        />
                                                                                                        <ListItemSecondaryAction>
                                                                                                                <IconButton onClick={deleteMed(idx)} edge="end" aria-label="delete">
                                                                                                                        <DeleteIcon />
                                                                                                                </IconButton>
                                                                                                        </ListItemSecondaryAction>
                                                                                                </ListItem>,
                                                                                            )}</List>
                                                                            </ExpansionPanelDetails>
                                                                    </ExpansionPanel>

                                                                    <Button onClick={() => props.closeFunc()} className={classes.submitButton}>
                                                                            {"BACK"}
                                                                    </Button>
                                                                    <Button onClick={submitDetails} className={classes.submitButton}>
                                                                            {"SAVE CHANGES"}
                                                                    </Button>
                                                            </CardBody>
                                                 </Card>
                                    </GridItem>
                            </GridContainer>
                            {/*<SnacbarNotification open={notif} text={"Checkup Record Added Successfully"}/>*/}



                            <Dialog open={medicinePicker} onClose={()=> setMedicinePicker(false)}>
                                    <DialogTitle>Add Medicine</DialogTitle>
                                    <DialogContent>
                                                    <TextField
                                                        style={{marginTop: "6px"}}
                                                        id="severity"
                                                        select
                                                        label="Medicine Name"
                                                        value={selectedMed}
                                                        onChange={(event) => setSelectedMed(event.target.value)}
                                                        fullWidth={true}
                                                        InputProps={{style: {fontSize: "0.9rem"}}}


                                                    >
                                                            {medicinesList.map((option,id) => (
                                                                <MenuItem  key={option.name+""+id} value={option.id}>
                                                                        {option.name}
                                                                </MenuItem>
                                                            ))}
                                                    </TextField>

                                    </DialogContent>
                                    <DialogActions>
                                            <Button onClick={() => setMedicinePicker(false)} color="primary">
                                                    Cancel
                                            </Button>
                                            <Button onClick={() => {
                                                    addMedicineToList();
                                                    setMedicinePicker(false);
                                            }} color="primary">
                                                    Ok
                                            </Button>
                                    </DialogActions>

                            </Dialog>







                    </div>



        )




}
