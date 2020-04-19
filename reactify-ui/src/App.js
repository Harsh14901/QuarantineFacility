import React, { Component } from 'react';
import './App.css';
import Facility from './facility/Facility';
import  {useContext, useEffect, useReducer, useState} from 'react';
import styles from './assets/jss/homeStyles'
import { makeStyles } from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import MenuItem from "@material-ui/core/MenuItem";
import CustomTabs from "components/CustomTabs/CustomTabs";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import tooltipsStyle from "assets/jss/material-kit-react/tooltipsStyle";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import SpeedDial from '@material-ui/lab/SpeedDial';
import RestoreIcon from '@material-ui/icons/Restore'
import EditIcon from '@material-ui/icons/Edit';
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CloseIcon from "@material-ui/icons/Close"
import MailIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home"
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import GetFacilityData from "facility/GetFacilityData";
import PostFacilityData from "facility/postFacilityData";



const useStyles = makeStyles(styles);
const tooltipUseStyles =makeStyles(tooltipsStyle);

function App() {
        const classes=useStyles();
        const tooltipClasses = tooltipUseStyles();
        const [addGrp,setAddGrp] =useState(true);
        const defaultUserDetail={name: "",age: 18,address: "",severe: false,contact: "",email: ""};
        const [userDetails,setUserDetails] = useState([defaultUserDetail,defaultUserDetail]);

        const severeCateg = [
                {
                        value: true,
                        label: 'High Risk',
                },
                {
                        value: false,
                        label: 'Low Risk',
                }
        ];

        const [fabOpen, setFabOpen] = React.useState(false);
        const [fabHidden, setFabHidden] = React.useState(false);

        const handleFabVisibility = () => {
                setFabHidden((prevHidden) => !prevHidden);
        };

        const handleFabOpen = () => {
                setFabOpen(true);
        };

        const handleFabClose = (j,title) => (event) => {
                if (title===actions[0].name){
                        addMember();
                }
                else if(title===actions[1].name){
                        deleteMember(j);
                }
                console.log(event);
                setFabOpen(false);
        };



        const actions = [
                { icon: <AddIcon />, name: 'Add Member' },
                { icon: <DeleteIcon />, name: 'Delete Member' },
                { icon: <RestoreIcon />, name: 'Reset Member Details' },
        ];



        const handleChange = (prop,j) => (event) => {
                if(prop==='age'){
                        if(event.target.value<0 || event.target.value>150)
                                return;
                }
                let temp=[...userDetails];
                temp[j]={ ...userDetails[j], [prop]: event.target.value };
                setUserDetails(temp);
                console.log(userDetails[j].name)

        };

        function getFacilityData() {
                GetFacilityData();
        }
        function postFacilityData() {
                PostFacilityData();
        }


        function submitDetails(){
        }

        function addMember() {
                let temp=[...userDetails];
                temp.push(defaultUserDetail);
                setUserDetails(temp)
        }
        function deleteMember(j){
                let temp=[...userDetails];
                temp.splice(j, 1);
                setUserDetails(temp)
        }

        useEffect(() => {

        }, []);

        const addGroup= ()=>{
                setAddGrp(true)
        };
  return(
      <div className={classes.body}>
              <div className={classes.container}>
                      <button onClick={addGroup}>
                                Add a group
                      </button>
                      <button>
                              Search for a group
                      </button>
                      <button onClick={getFacilityData}>
                              Get Data
                      </button>
                      <button onClick={postFacilityData}>
                              Post Data
                      </button>
              </div>
              {addGrp?
                  <div className={classes.formDiv}>

                              <h1>Group Details</h1>
                          <GridContainer justify="center" style={{width:"80%"}}>
                                  <GridItem xs={12} md={6}>
                              <CustomTabs headerColor="primary" tabs={userDetails.map((data2,j) => (
                                  {
                                          tabName: "Member "+(j+1),
                                          tabContent: (<div style={{padding: "0 30px 0 30px",display: "flex",justifyContent: "center",flexDirection: "column",alignItems:"center"}}>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('name',j)} color="primary" label="Name" required defaultValue={userDetails[j].name}
                                                 InputProps={{
                                                         style: {fontSize: "0.9rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <People />
                                                             </InputAdornment>
                                                         ),
                                                 }}>
                                      </TextField>
                                        <TextField className={classes.textField} fullWidth={true} onChange={handleChange('age',j)} color="primary" type="number" label="Age" required value={userDetails[j].age}>
                                        </TextField>
                                      <TextField className={classes.textField} fullWidth={true} color="primary" onChange={handleChange('address',j)} label="Address" required defaultValue={userDetails[j].address}
                                                 InputProps={{
                                                         style: {fontSize: "0.9rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <HomeIcon />
                                                             </InputAdornment>
                                                         ),
                                                 }}>

                                      </TextField>
                              <TextField
                                  className={classes.textField}
                                  id="severity"
                                  select
                                  label="Severity"
                                  value={userDetails[j].severe}
                                  onChange={handleChange('severe',j)}
                                  fullWidth={true}
                                  InputProps={{style: {fontSize: "0.9rem"}}}


                              >
                                      {severeCateg.map((option) => (
                                          <MenuItem  key={option.value} value={option.value}>
                                                  {option.label}
                                          </MenuItem>
                                      ))}
                              </TextField>
                              <TextField className={classes.textField} fullWidth={true} onChange={handleChange('contact',j)} type="number" color="primary" label="Contact Number" required defaultValue={userDetails[j].contact}
                                         InputProps={{
                                                 style: {fontSize: "0.9rem"},
                                                 endAdornment: (
                                                     <InputAdornment position="end">
                                                             <PhoneIcon />
                                                     </InputAdornment>
                                                 ),
                                         }}>

                              </TextField>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('email',j)}  color="primary" label="Email" required defaultValue={userDetails[j].email}

                                                 InputProps={{
                                                         style: {fontSize: "0.9rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <Email />
                                                             </InputAdornment>
                                                         ),
                                                 }}>

                                      </TextField>
                              <div style={{position: "relative",padding: "20px",display: "flex",justifyContent: "center",alignItems: "center", width:"100%"}}>
                              <Button onClick={submitDetails} className={classes.submitButton}>
                                      Submit
                              </Button>
                                              <SpeedDial
                                                  style={{position:"absolute",bottom: "15px",right: "5px"}}
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



                  </div>
                  :null
          }
      </div>
  )
}

export default App;
