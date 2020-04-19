import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {LocationCity} from "@material-ui/icons";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import CardFooter from "components/Card/CardFooter";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import styles from "assets/jss/homeStyles";
import getFacilitiesList from "facility/getFacilitiesList";
import MapExtreme from "views/Maps/MapExtreme";
import Dialog from "@material-ui/core/Dialog";

const useStyles2 = makeStyles(styles2);



const useStyles = makeStyles(styles);

export default function ChangeFacilityDialog(props) {

        const classes2=useStyles2();
        const classes=useStyles();


        const [selectedFacility,setSelectedFacility] = useState ("");
        const [facilitiesList,setFacilitiesList] = useState([]);
        const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");





        function getFacilities(data){

                const callback = res => {
                        console.log("Got the facilities",res);
                        let temp=[];
                        for(let x=0;x<res.length;x++)
                                temp.push({value: res[x].id,label: res[x].name});

                        setFacilitiesList(temp)
                };

                getFacilitiesList(callback,{latitude: data[0],longitude: data[1]})

        }

        function submitDetails(){
                props.submitFunc(selectedFacility);
                props.closeFunc()
        }

        useEffect(() => {
                console.log("loook at this and nothing else",props.data);
                getFacilities(props.data)
        },[]);







        setTimeout(function() {
                setCardAnimation("");
        }, 700);

        return(
            <div className={classes.formDiv}>

                    <GridContainer justify="center" style={{width:"100%",marginLeft: "80px",marginRight: "80px"}}>
                            <GridItem xs={12} md={12}>
            <Card className={classes2[cardAnimaton]}>
                    <form className={classes2.form}>
                            <CardHeader color="primary" className={classes2.cardHeader}>
                                    <h4>Change Facility</h4>
                            </CardHeader>
                            <CardBody>

                                    <TextField
                                        style={{marginTop: "12px"}}
                                        id="facility"
                                        select
                                        label="Chose Preferred facility"
                                        value={selectedFacility}
                                        onChange={(e) =>{setSelectedFacility(e.target.value)}}
                                        fullWidth={true}
                                        InputProps={{style: {fontSize: "0.9rem"}}}


                                    >
                                            {facilitiesList.map((option) => (
                                                <MenuItem  key={option.value} value={option.value}>
                                                        {option.label}
                                                </MenuItem>
                                            ))}
                                    </TextField>

                            </CardBody>
                            <CardFooter className={classes2.cardFooter}>
                                    <Button onClick={props.closeFunc} className={classes.submitButton}>
                                            CANCEL
                                    </Button>
                                    <Button onClick={submitDetails} className={classes.submitButton}>
                                            Change Facility
                                    </Button>
                            </CardFooter>
                    </form>
            </Card>



        </GridItem>
        </GridContainer>

            </div>

)
}
