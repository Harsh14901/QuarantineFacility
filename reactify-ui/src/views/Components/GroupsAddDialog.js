
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import styles from "assets/jss/homeStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Dialog from "@material-ui/core/Dialog";
import TootltipStyles from 'assets/jss/material-kit-react/tooltipsStyle'
import CustomTabs from "components/CustomTabs/CustomTabs";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AddGroupDialog from "views/Components/AddGroupDialog";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import CustomInput from "components/CustomInput/CustomInput";

const useStyles2 = makeStyles(styles2);
const useStyles = makeStyles(styles);
const useStyles3 = makeStyles(TootltipStyles);

const Para = ({text}) => {
        return(
            <p style={{fontSize:"1.4rem",fontWeight: "300",fontColor: "black"}}>{text}</p>
        )
};

const InputText = (props) => {
        const classes2 = useStyles2();
        return(
            <CustomInput
                labelText={props.title+"..."}
                id={props.title}
                formControlProps={{
                        fullWidth: true
                }}
                inputProps={{
                        readOnly: true,
                        value: props.value,
                        type: "text",
                        endAdornment: (
                            <InputAdornment position="end">
                                    <People className={classes2.inputIconsColor} />
                            </InputAdornment>
                        )
                }}
            />
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
        const defaultGroupDetail = {category: "",vip: "",member_count: 0,address: ""};
        const defaultGroupCompDetails = {person_set: [],facility_preference: "",category: ""};
        const [fabOpen,setFabOpen] = useState(false);
        const [groupDetails,setGroupDetails] = useState([defaultGroupDetail]);
        const [groupToEdit,setGroupToEdit] = useState(0);
        const [compGrpDetails,setCompGrpDetails] = useState([defaultGroupCompDetails]);
        const [open,setOpen] = useState(false);

        const handleFabOpen = () => {
                setFabOpen(true)
        };

        const handleDialogClose = () => {
                setOpen(false)
        };

        const submitDetails = () =>{
                props.submitFunc(compGrpDetails)
        };

        const editGroup = (j) => {
                setGroupToEdit(j);
                setOpen(true)
        };

        const deleteGroup = (j) => {
                let temp =[...groupDetails];
                temp.splice(j,1);
                setGroupDetails(temp);
                let temp2 =[...compGrpDetails];
                temp2.splice(j,1);
                setCompGrpDetails(temp2);

        };

        const addGroup = () => {
                let temp =[...groupDetails];
                temp.push(defaultGroupDetail);
                setGroupDetails(temp);
                let temp2 =[...compGrpDetails];
                temp2.push(defaultGroupCompDetails);
                setCompGrpDetails(temp2);
        };

        const handleFabClose = (j,title) => (event) => {
                if (title===actions[0].name){
                        editGroup(j);
                }
                else if(title===actions[1].name){
                        addGroup();
                }
                else if(title===actions[2].name){
                        deleteGroup(j);
                }
                //  console.log(event);
                setFabOpen(false);
        };

        const addOrEditDetails= (data) => {
                //  console.log("Just check out what the error is",compGrpDetails);
                let temp = [...compGrpDetails];
                temp[groupToEdit] = data;
                setCompGrpDetails(temp);
                let temp2 = [...groupDetails];
                temp2[groupToEdit].category=data.category;
                temp2[groupToEdit].address=data.person_set[0].address;
                temp2[groupToEdit].member_count=data.person_set.length;
                temp2[groupToEdit].vip=data.person_set[0].vip;
                setGroupDetails(temp2);
                setOpen(false)


        };

        const actions = [
                { icon: <EditIcon />, name: 'Edit Group Details' },
                { icon: <AddIcon />, name: 'Add Group' },
                { icon: <DeleteIcon />, name: 'Delete Group' },
        ];



        useEffect(()=> {
        });

        return(
            <div className={classes.formDiv}>

                    <GridContainer justify="center" style={{width:"100%",marginLeft: "80px",marginRight: "80px"}}>
                            <GridItem xs={12} md={12}>
                                    <CustomTabs headerColor="primary" tabs={groupDetails.map((data2,j) => (
                                            {
                                                    tabName: "Group "+(j+1),
                                                    tabContent: (
                                                        <div className={classes2.container}>

                                                                <InputText title={"Category"} value={data2.category?data2.category:"Add members to see Details"}/>
                                                                <InputText title={"VIP"} value={data2.vip?data2.vip:"false"}/>
                                                                <InputText title={"Member Count"} value={data2.member_count}/>
                                                                <InputText title={"Address"} value={data2.address+"\u00a0"}/>

                                                                <div style={{position: "relative",padding: "20px",display: "flex",justifyContent: "center",alignItems: "center", width:"100%"}}>
                                                                        <Button onClick={submitDetails} className={classes.submitButton}>
                                                                                SUBMIT
                                                                        </Button>
                                                                        <SpeedDial
                                                                            style={{position:"absolute",bottom: "15px",right: "50px"}}
                                                                            ariaLabel="SpeedDial openIcon example"
                                                                            // hidden={fabHidden}
                                                                            icon={<SpeedDialIcon icon={<EditIcon/>} openIcon={<CloseIcon />} />}
                                                                            onClose={handleFabClose(j,"")}
                                                                            onOpen={handleFabOpen}
                                                                            open={fabOpen}
                                                                        >
                                                                                {actions.map((action) => (
                                                                                    <SpeedDialAction
                                                                                        key={action.name}
                                                                                        icon={action.icon}
                                                                                        tooltipTitle={action.name}
                                                                                        onClick={handleFabClose(j,action.name)}
                                                                                    />
                                                                                ))}
                                                                        </SpeedDial>





                                                                </div>
                                                        </div>


                                                    )}))}>

                                        </CustomTabs>


                            </GridItem>
                    </GridContainer>

                    <Dialog
                        open={open}
                        PaperProps={{
                                style: {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        scrollbarColor: "transparent"
                                },
                        }}
                        onClose={handleDialogClose}
                    >
                        <AddGroupDialog submitFunc={addOrEditDetails} data={compGrpDetails[groupToEdit]}/>
                    </Dialog>



            </div>
        )
};

