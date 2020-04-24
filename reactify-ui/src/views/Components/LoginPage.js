import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PhoneIcon from '@material-ui/icons/Phone';


import styles2 from "assets/jss/material-kit-react/views/loginPage.js";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";

const useStyles2 = makeStyles(styles2);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [checked,changeChecked] = useState(false);
  const [values,setValues] = useState({name: "",phoneNumber: "",email: ""});  // contains all details that user typed
  const type=props.type;  // stores appointment type


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

  const handleChange = event => {
    changeChecked(!checked)
  };

  const handleInputChange = e => {
    const {id, value} = e.target;
    setValues({...values, [id]: value})
  };

  const book = () =>{
    if(checked===true){
      console.log("Redirecting to payment gateway")
    }
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes2 = useStyles2();
  const { ...rest } = props;
  return (
        <div className={classes2.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Card className={classes2[cardAnimaton]}>
                <form className={classes2.form}>
                  <CardHeader color="primary" className={classes2.cardHeader}>
                    <h4>Book Your Appointment</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Name..."
                      id="name"
                      onChange={handleInputChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes2.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Age..."
                      id="age"
                      onChange={handleInputChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneIcon className={classes2.inputIconsColor}>
                            </PhoneIcon>

                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Address..."
                      id="address"
                      required
                      onChange={handleInputChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes2.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                          <TextField
                              className={classes2.textField}
                              id="severity"
                              select
                              label="Severity"
                              value={"low"}
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

                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox checked={checked} onChange={handleChange} name="checkedA" />}*/}
                    {/*    label="I agree to terms and conditions"*/}
                    {/*/>*/}
                  </CardBody>
                  <CardFooter className={classes2.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={book}>
                      Book Now
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
  );
}
