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



const useStyles = makeStyles(styles);

function App() {
        const classes=useStyles();
        const [addGrp,setAddGrp] =useState(false);
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
                                          tabContent: (<div>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('name')} color="#ff00ff" label="Name" required defaultValue={userDetails[0].name}
                                                 InputProps={{
                                                         style: {fontSize: "1.0rem"},
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <People />
                                                             </InputAdornment>
                                                         ),
                                                 }}>
                                      </TextField>
                                        <TextField className={classes.textField} fullWidth={true} onChange={handleChange('age')} color="secondary" type="number" label="Age" required value={userDetails[0].age}>
                                        </TextField>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('address')} color="secondary" label="Address" required defaultValue={userDetails[0].address}
                                                 InputProps={{
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
                                  value={userDetails[0].severe}
                                  onChange={handleChange('severe')}
                                  fullWidth={true}
                              >
                                      {severeCateg.map((option) => (
                                          <MenuItem key={option.value} value={option.value}>
                                                  {option.label}
                                          </MenuItem>
                                      ))}
                              </TextField>
                              <TextField className={classes.textField} fullWidth={true} onChange={handleChange('contact')} type="number" color="secondary" label="Contact Number" required defaultValue={userDetails[0].contact}
                                         InputProps={{
                                                 endAdornment: (
                                                     <InputAdornment position="end">
                                                             <People />
                                                     </InputAdornment>
                                                 ),
                                         }}>

                              </TextField>
                                      <TextField className={classes.textField} fullWidth={true} onChange={handleChange('email')}  color="secondary" label="Email" required defaultValue={userDetails[0].email}

                                                 InputProps={{
                                                         endAdornment: (
                                                             <InputAdornment position="end">
                                                                     <Email />
                                                             </InputAdornment>
                                                         ),
                                                 }}>

                                      </TextField>

                              <button onClick={submitDetails}>
                                      Submit
                              </button>
                                              </div>

                                      )}))}>

                      </CustomTabs>


                       </div>:null
          }
      </div>
  )
}

export default App;
