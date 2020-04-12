import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import MenuItem from "@material-ui/core/MenuItem";
import PhoneIcon from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/homeStyles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";

import styles2 from "assets/jss/material-kit-react/views/loginPage.js";
import CustomInput from "components/CustomInput/CustomInput";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import Card from "components/Card/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles2 = makeStyles(styles2);



const useStyles = makeStyles(styles);

function AddGroupDialog(props) {
        const classes =useStyles();
        const classes2 = useStyles2();


        const defaultUserDetail={name: "",age: 18,address: "",risk: false,contact: "",email: "",latitude:"80.12345",longitude:"80.12345",vip:false};
        const [userDetails,setUserDetails] = useState([defaultUserDetail,defaultUserDetail]);
        const [step,setStep] = useState(1);
        const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
        const [VIPStatus,setVipStatus] = useState(false);
        const [category,setCategory] =useState(false);
        setTimeout(function() {
                setCardAnimation("");
        }, 700);

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

        const handleInputChange = e => {
                const {id, value} = e.target;
        };


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


        function submitDetails(){
                let temp=[];
                userDetails.map((data,j)=>{
                        temp.push({...userDetails[j],vip: VIPStatus,risk: userDetails[j].risk?"high":"low"})
                });
                props.submitFunc([{category:(category?"adults":"family"),facility_preference:3,person_set: temp}])
        }

        function goNext(){
                setStep((step===1)?2:1)
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

        function handleVIP(){
                setVipStatus(!VIPStatus)
        }
        function handleCategory() {
                setCategory(!category)
        }

        return(
            <div className={classes.formDiv}>

                    <GridContainer justify="center" style={{width:"100%",marginLeft: "80px",marginRight: "80px"}}>
                            <GridItem xs={12} md={12}>
                                    {(step===1)? <CustomTabs headerColor="primary" tabs={userDetails.map((data2,j) => (
                                        {
                                                tabName: "Member "+(j+1),
                                                tabContent: (<div className={classes2.container}>
                                                            <CustomInput
                                                                labelText="Name..."
                                                                id="name"
                                                                formControlProps={{
                                                                        fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                        value: userDetails[j].name,
                                                                        onChange: handleChange("name",j),
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
                                                                        value: userDetails[j].age,
                                                                        onChange: handleChange("age",j),
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
                                                                        value: userDetails[j].address,
                                                                        onChange: handleChange("address",j),
                                                                        type: "text",
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                    <HomeIcon className={classes2.inputIconsColor} />
                                                                            </InputAdornment>
                                                                        ),
                                                                        autoComplete: "off"
                                                                }}
                                                            />
                                                            <TextField
                                                                style={{marginTop: "6px"}}
                                                                id="severity"
                                                                select
                                                                label="Severity"
                                                                value={userDetails[j].risk}
                                                                onChange={handleChange('risk',j)}
                                                                fullWidth={true}
                                                                InputProps={{style: {fontSize: "0.9rem"}}}


                                                            >
                                                                    {severeCateg.map((option) => (
                                                                        <MenuItem  key={option.value} value={option.value}>
                                                                                {option.label}
                                                                        </MenuItem>
                                                                    ))}
                                                            </TextField>
                                                            <CustomInput
                                                                labelText="Contact Number..."
                                                                id="contact"
                                                                value={userDetails[j].contact}
                                                                onChange={handleInputChange}
                                                                formControlProps={{
                                                                        fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                        onChange: handleChange("contact",j),
                                                                        value: userDetails[j].contact,
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
                                                                labelText="Email..."
                                                                id="email"
                                                                required
                                                                onChange={handleInputChange}
                                                                formControlProps={{
                                                                        fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                        type: "text",
                                                                        onChange: handleChange("email",j),
                                                                        value: userDetails[j].email,
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                    <Email className={classes2.inputIconsColor} />
                                                                            </InputAdornment>
                                                                        ),
                                                                        autoComplete: "off"
                                                                }}
                                                            />

                                                            <div style={{position: "relative",padding: "20px",display: "flex",justifyContent: "center",alignItems: "center", width:"100%"}}>
                                                                    <Button onClick={goNext} className={classes.submitButton}>
                                                                            Next
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
                            :<Card className={classes2[cardAnimaton]}>
                                                <form className={classes2.form}>
                                                        <CardHeader color="primary" className={classes2.cardHeader}>
                                                                <h4>ADDITIONAL GROUP DETAILS</h4>
                                                        </CardHeader>
                                                        <CardBody>
                                                                <FormControlLabel
                                                                    control={
                                                                            <Switch
                                                                                checked={VIPStatus}
                                                                                onChange={handleVIP}
                                                                                name="VIP Status"
                                                                                color="primary"
                                                                            />
                                                                    }
                                                                    label="Enable VIP Status"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                            <Switch
                                                                                checked={category}
                                                                                onChange={handleCategory}
                                                                                name="Category"
                                                                                color="primary"
                                                                            />
                                                                    }
                                                                    label={"Category: " + (category?"Adults":"Family")}
                                                                />
                                                                {/*<CustomInput*/}
                                                                {/*    labelText="Name..."*/}
                                                                {/*    id="name"*/}
                                                                {/*    onChange={handleInputChange}*/}
                                                                {/*    formControlProps={{*/}
                                                                {/*            fullWidth: true*/}
                                                                {/*    }}*/}
                                                                {/*    inputProps={{*/}
                                                                {/*            type: "text",*/}
                                                                {/*            endAdornment: (*/}
                                                                {/*                <InputAdornment position="end">*/}
                                                                {/*                        <People className={classes2.inputIconsColor} />*/}
                                                                {/*                </InputAdornment>*/}
                                                                {/*            )*/}
                                                                {/*    }}*/}
                                                                {/*/>*/}

                                                                {/*<FormControlLabel*/}
                                                                {/*    control={<Checkbox checked={checked} onChange={handleChange} name="checkedA" />}*/}
                                                                {/*    label="I agree to terms and conditions"*/}
                                                                {/*/>*/}
                                                        </CardBody>
                                                        <CardFooter className={classes2.cardFooter}>
                                                                <Button onClick={goNext} className={classes.submitButton}>
                                                                        BACK
                                                                </Button>
                                                                <Button onClick={submitDetails} className={classes.submitButton}>
                                                                        SUBMIT
                                                                </Button>
                                                        </CardFooter>
                                                </form>
                                        </Card>
                                    }


                            </GridItem>
                    </GridContainer>



            </div>
        )
}

export default AddGroupDialog
