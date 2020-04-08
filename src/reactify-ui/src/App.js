import React, { Component } from 'react';
import './App.css';
import Facility from './facility/Facility';
import  {useContext, useEffect, useReducer, useState} from 'react';
import styles from './assets/jss/homeStyles'
import { makeStyles } from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import {AccountCircle} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import CustomTabs from "components/CustomTabs/CustomTabs";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import tooltipsStyle from "assets/jss/material-kit-react/tooltipsStyle";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";



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




        const handleChange = (prop) => (event) => {
                if(prop==='age'){
                        if(event.target.value<0 || event.target.value>150)
                                return;
                }
                let temp=[...userDetails];
                temp[0]={ ...userDetails[0], [prop]: event.target.value };
                setUserDetails(temp);
                console.log(userDetails[0].name)

        };

        function submitDetails(){

        }

        function addMember() {
                let temp=[...userDetails];
                temp.push(defaultUserDetail);
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
              </div>
              {addGrp?
                      <div className={classes.formDiv}>
                              <h1>Group Details</h1>

                              <CustomTabs headerColor="primary" tabs={userDetails.map((data2,j) => (
                                  {
                                          tabName: "Member "+(j+1),
                                          tabContent: (<div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems:"center"}}>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('name')} color="primary" label="Name" required defaultValue={userDetails[j].name}
                                                 InputProps={{
                                                         style: {fontSize: "0.9rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <People />
                                                             </InputAdornment>
                                                         ),
                                                 }}>
                                      </TextField>
                                        <TextField className={classes.textField} fullWidth={true} onChange={handleChange('age')} color="primary" type="number" label="Age" required value={userDetails[j].age}>
                                        </TextField>
                                      <TextField className={classes.textField} fullWidth={true} color="primary" onChange={handleChange('address')} label="Address" required defaultValue={userDetails[j].address}
                                                 InputProps={{
                                                         style: {fontSize: "0.9rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <People />
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
                                  onChange={handleChange('severe')}
                                  fullWidth={true}
                                  InputProps={{style: {fontSize: "0.9rem"}}}


                              >
                                      {severeCateg.map((option) => (
                                          <MenuItem  key={option.value} value={option.value}>
                                                  {option.label}
                                          </MenuItem>
                                      ))}
                              </TextField>
                              <TextField className={classes.textField} fullWidth={true} onChange={handleChange('contact')} type="number" color="primary" label="Contact Number" required defaultValue={userDetails[j].contact}
                                         InputProps={{
                                                 style: {fontSize: "0.9rem"},
                                                 endAdornment: (
                                                     <InputAdornment position="end">
                                                             <People />
                                                     </InputAdornment>
                                                 ),
                                         }}>

                              </TextField>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('email')}  color="primary" label="Email" required defaultValue={userDetails[j].email}

                                                 InputProps={{
                                                         style: {fontSize: "0.9rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <Email />
                                                             </InputAdornment>
                                                         ),
                                                 }}>

                                      </TextField>
                              <div style={{position:"relative",width:"100%"}}>
                              <Button onClick={submitDetails} className={classes.submitButton}>
                                      Submit
                              </Button>
                                      <Tooltip
                                          id="tooltip-top"
                                          title="Add a member"
                                          placement="top"
                                          classes={{ tooltip: tooltipClasses.tooltip }}
                                      >
                                      <Fab onClick={addMember} style={{right: "5px",top: "20%",position:"absolute"}} size="small" color="primary" aria-label="add">
                                              <AddIcon/>

                                      </Fab>
                                      </Tooltip>
                                      <Tooltip
                                          id="tooltip-top"
                                          title="Delete this member"
                                          placement="top"
                                          classes={{ tooltip: tooltipClasses.tooltip }}
                                      >
                                              <Fab onClick={addMember} style={{right: "55px",top: "20%",position:"absolute"}} size="small" color="primary" aria-label="add">
                                                      <DeleteIcon/>

                                              </Fab>
                                      </Tooltip>

                              </div>
                                              </div>

                                      )}))}>

                      </CustomTabs>


                       </div>:null
          }
      </div>
  )
}

export default App;
