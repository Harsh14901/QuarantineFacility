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
import PatchData from "PeopleData/PatchData";


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
        const [userList,setUserList] = useState([]);
        const [luxuryPicker,setLuxuryPicker] = useState(false);
        const [selectedLux,setSelectedLux] = useState(1);




        const deleteLuxury = (idx) => event =>{
                let temp=[...userList];
                temp=temp.filter(function(value,id){return id!==idx});
                //console.log("medicinesList is", temp[checkupDetails.length-1].medicines);
                setUserList(temp);
                console.log("I have deleted this",idx)

        };


        function submitDetails(){

                const callback = res =>{
                        console.log("Checkup details edited",res);
                        setNotif(true)

                };
                let data={luxuries: userList,id: props.data.id};
                console.log("I am going to patch this data",JSON.stringify(data));
                PatchData(callback,data,DOMAIN + '/checkup-records/')


        }

        function getLuxuriesList(){
                const callback = res => {
                        console.log('lux list',res);
                        setLuxuriesList(res);
                };
                getData(callback,DOMAIN + '/luxuries/')
        }


        setTimeout(function() {
                setCardAnimation("");
        }, 700);

        function addLuxuryToList(){
                let temp = [...userList];
                if(!temp.includes(selectedLux)){
                        temp.push(selectedLux);
                        setUserList(temp)
                }
        }

        function getLuxName(id){
                let name="";
                luxuriesList.map((data)=> {
                        // console.log("ids are here",data.id,id);
                        if(data.id===id) {
                                name = data.category;
                                //console.log("name is here",name)
                        }
                        return name
                });
                //console.log(name);
                return name;
        }

        function getLuxCost(id){
                let cost="";
                luxuriesList.map((data)=> {
                        if(data.id===id)
                                cost=data.cost;
                        return cost
                });
                return cost;
        }

        function handleLuxuryPickerChange(){
                setLuxuryPicker(true)
        }

        useEffect(() => {
                getLuxuriesList();
                setUserList(props.data.luxuries);
        }, []);


        return(


                    <div className={classes.formDiv}>
                            <GridContainer>
                                    <GridItem xs={12}>

                                                 <Card className={classes2[cardAnimation]}>
                                                            <CardHeader color="primary" className={classes2.cardHeader}>
                                                                    <h4>{props.data.name+" Luxuries"}</h4>
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
                                                                                                handleLuxuryPickerChange()
                                                                                        }
                                                                                        }
                                                                                        onFocus={(event) => event.stopPropagation()}
                                                                                        control={<Add />}
                                                                                        label="Luxuries"
                                                                                    />
                                                                            </ExpansionPanelSummary>
                                                                            <ExpansionPanelDetails>
                                                                                    <List style={{width: "100%"}}>
                                                                                            {userList.map((data,idx) =>
                                                                                                <ListItem>
                                                                                                        <ListItemAvatar>
                                                                                                                <Avatar>
                                                                                                                        <LuxuriesIcon />
                                                                                                                </Avatar>
                                                                                                        </ListItemAvatar>
                                                                                                        <ListItemText
                                                                                                            primary={getLuxName(data)}
                                                                                                            secondary={'Cost:- ' +getLuxCost(data)}
                                                                                                        />
                                                                                                        <ListItemSecondaryAction>
                                                                                                                <IconButton onClick={deleteLuxury(idx)} edge="end" aria-label="delete">
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



                            <Dialog open={luxuryPicker} onClose={()=> setLuxuryPicker(false)}>
                                    <DialogTitle>Add Luxury</DialogTitle>
                                    <DialogContent>
                                                    <TextField
                                                        style={{marginTop: "6px"}}
                                                        id="severity"
                                                        select
                                                        label="Luxury Name"
                                                        value={selectedLux}
                                                        onChange={(event) => setSelectedLux(event.target.value)}
                                                        fullWidth={true}
                                                        InputProps={{style: {fontSize: "0.9rem"}}}


                                                    >
                                                            {luxuriesList.map((option,id) => (
                                                                <MenuItem  key={option.category+""+id} value={option.id}>
                                                                        {option.category}
                                                                </MenuItem>
                                                            ))}
                                                    </TextField>

                                    </DialogContent>
                                    <DialogActions>
                                            <Button onClick={() => setLuxuryPicker(false)} color="primary">
                                                    Cancel
                                            </Button>
                                            <Button onClick={() => {
                                                    addLuxuryToList();
                                                    setLuxuryPicker(false);
                                            }} color="primary">
                                                    Ok
                                            </Button>
                                    </DialogActions>

                            </Dialog>







                    </div>



        )




}
