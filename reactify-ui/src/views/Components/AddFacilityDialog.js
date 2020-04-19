import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Email from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CardFooter from "components/Card/CardFooter";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import styles from "assets/jss/homeStyles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import GetFacilityData from "facility/GetFacilityData";
import PostFacilityData from "facility/postFacilityData";
import PostData from "facility/postData";
import MapExtreme from "views/Maps/MapExtreme";
import Dialog from "@material-ui/core/Dialog";
import {LocationCity} from "@material-ui/icons";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AreaIcon from "assets/img/icons/AreaIcon";
import CapacityIcon from "assets/img/icons/CapacityIcon";
import RoomIcon from "assets/img/icons/RoomIcon";
import {DOMAIN} from "variables/Constants";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles2 = makeStyles(styles2);



const useStyles = makeStyles(styles);

function AddFacilityDialog(props){
        const classes2=useStyles2();
        const classes=useStyles();

        const defaultRoomState={ward: 0,category: 2,room_number: "",area: 0,capacity: 1,type: 0};

        const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

        const [facilityId,setFacilityId] = useState(-1);
        const [ward1Id,setWard1Id] = useState(-1);
        const [ward2Id,setWard2Id] = useState(-1);
        const [roomDetails,setRoomDetails] = useState([defaultRoomState]);
        const [step,setStep] = useState(1);
        const [facilityDetails,setFacilityDetails] = useState({name: "",address: "",owner: ""});
        const [reqDet,setReqDet] = useState(false);
        const actions = [
                { icon: <AddIcon />, name: 'Add Room' },
                { icon: <DeleteIcon />, name: 'Delete Room' },
                { icon: <RestoreIcon />, name: 'Reset Room Details' },
        ];



        const [LocationPicker,setLocationPicker] = useState(false);
        const [address,setAddress] = useState("");
        const [latLong,setLatLong] = useState([25,82]);
        const [VIPStatus,setVipStatus] = useState(false);
        function handleVIP(){
                setVipStatus(!VIPStatus)
        }


        const wardCateg = [
                {
                        value: 2,
                        label: 'Ward 2',
                },
                {
                        value: 1,
                        label: 'Ward 1',
                }
        ];
        const roomCateg = [
                {
                        value: 0,
                        label: 'Economy',
                },
                {
                        value: 1,
                        label: 'Deluxe',
                }
        ];


        const [fabOpen, setFabOpen] = React.useState(false);


        function pickLocation() {
                setLocationPicker(true)
        }

        function handleLocationClose(){
                setLocationPicker(false)
        }

        function submitLocationDetails(data){
                setAddress(data.info);
                setLatLong(data.marker);
                handleLocationClose();
                console.log(data.marker);
                console.log(data.info);
                if(!data.info){
                        setAddress(data.marker[0]+"N , "+data.marker[1]+"S")
                }

        }

        const handleAddressChange = event => {
                setAddress(event.target.value)
        };


        function addRoom() {
                let temp=[...roomDetails];
                temp.push(defaultRoomState);
                setRoomDetails(temp)
        }
        function deleteRoom(j){
                let temp=[...roomDetails];
                temp.splice(j, 1);
                setRoomDetails(temp)
        }

        const handleFabOpen = () => {
                setFabOpen(true);
        };

        function goNext(){
                setStep((step===1)?2:1)
        }

        const handleFabClose = (j,title) => (event) => {
                if (title===actions[0].name){
                        addRoom();
                }
                else if(title===actions[1].name){
                        deleteRoom(j);
                }
                console.log(event);
                setFabOpen(false);
        };


        const handleChange = (prop,j) => (event) => {
                if(prop==='capacity' || prop==='area'){
                        if(event.target.value<=0 )
                                return;
                }
                let temp=[...roomDetails];
                temp[j]={ ...roomDetails[j], [prop]: event.target.value };
                setRoomDetails(temp);
                console.log(roomDetails[j].name)

        };
        const handleFacilityChange = (prop) => (event) => {
                setFacilityDetails({ ...facilityDetails, [prop]: event.target.value });
                console.log(facilityDetails)

        };

        function submitDetails(){
                let details=[];
                roomDetails.map((data)=>{
                        const rooms=data.room_number;
                        let numbers=[];
                        let num="";
                        for (let i=0;i<rooms.length;i++){
                                if(rooms.charAt(i)===',') {
                                        numbers.push(num);
                                        num=""
                                }
                                else{
                                        num+=rooms.charAt(i)
                                }
                        }
                        if(num!=="")
                                numbers.push(num);
                        numbers.map((data2) => {
                                const id =(data.category===1)?ward1Id:ward2Id;
                                details.push({ward: id,category: data.category+"",type: VIPStatus?data.type+2:data.type,room_num: parseInt(data2),floor: 0,area:data.area,capacity:data.capacity})
                        })
                });
                props.submitFunc(details);
                console.log("Submitting Details",details)
        }

        function postWard(cat,id){
                const callback = result => {
                        console.log("wardId is here",result);
                        if(cat===1)
                                setWard1Id(result.id);
                        else
                                setWard2Id(result.id);
                        if(ward1Id!==-1 && ward2Id!==-1)
                                setStep(2)

                };
                const data={facility: id,category:cat+""};
                console.log("ward detailsss",data);
                PostData(callback,data,DOMAIN + '/wards/')
        }

        function postFacility(){
                const callback = result => {
                        console.log("ward is here",result);
                        setFacilityId(result.id);
                        postWard(1,result.id);
                        postWard(2,result.id);
                        setStep(2)

                };
                if(facilityDetails.name==="" || facilityDetails.address==="" || facilityDetails.address==="")
                {       setReqDet(true)
                return}
                let temp={...facilityDetails,isVIP: VIPStatus,latitude: latLong[0],longitude: latLong[1],address:address};
                console.log("posting fac",temp);
                PostFacilityData(callback,temp)
        }



        setTimeout(function() {
                setCardAnimation("");
        }, 700);

        return(
            <div className={classes.formDiv}>

                    <GridContainer justify="center" style={{width:"100%",marginLeft: "80px",marginRight: "80px"}}>
                            <GridItem xs={12} md={12}>
                                    {(step===2)? <CustomTabs headerColor="primary" tabs={roomDetails.map((data2,j) => (
                                            {
                                                    tabName: "Room "+(j+1),
                                                    tabContent: (<div className={classes2.container}>
                                                                <CustomInput
                                                                    labelText="Room Numbers..."
                                                                    id="room_num"
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            value: roomDetails[j].room_number,
                                                                            onChange: handleChange("room_number",j),
                                                                            type: "text",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <RoomIcon className={classes2.inputIconsColor} />
                                                                                </InputAdornment>
                                                                            )
                                                                    }}
                                                                />
                                                                <CustomInput
                                                                    labelText="Area(sq.ft)..."
                                                                    id="area"
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            value: roomDetails[j].area,
                                                                            onChange: handleChange("area",j),
                                                                            type: "number",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <AreaIcon className={classes2.inputIconsColor}>
                                                                                        </AreaIcon>

                                                                                </InputAdornment>
                                                                            )
                                                                    }}
                                                                />
                                                                <CustomInput
                                                                    labelText="Capacity..."
                                                                    id="capacity"
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            value: roomDetails[j].capacity,
                                                                            onChange: handleChange("capacity",j),
                                                                            type: "number",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <CapacityIcon className={classes2.inputIconsColor}>
                                                                                        </CapacityIcon>

                                                                                </InputAdornment>
                                                                            )
                                                                    }}
                                                                />
                                                                <TextField
                                                                    style={{marginTop: "6px"}}
                                                                    id="category"
                                                                    select
                                                                    label="Category"
                                                                    value={roomDetails[j].category}
                                                                    onChange={handleChange('category',j)}
                                                                    fullWidth={true}
                                                                    InputProps={{style: {fontSize: "0.9rem"}}}


                                                                >
                                                                        {wardCateg.map((option) => (
                                                                            <MenuItem  key={option.value} value={option.value}>
                                                                                    {option.label}
                                                                            </MenuItem>
                                                                        ))}
                                                                </TextField>
                                                                <TextField
                                                                    style={{marginTop: "6px"}}
                                                                    id="roomType"
                                                                    select
                                                                    label="Room Type"
                                                                    value={roomDetails[j].type}
                                                                    onChange={handleChange('type',j)}
                                                                    fullWidth={true}
                                                                    InputProps={{style: {fontSize: "0.9rem"}}}


                                                                >
                                                                        {roomCateg.map((option) => (
                                                                            <MenuItem  key={option.value} value={option.value}>
                                                                                    {option.label}
                                                                            </MenuItem>
                                                                        ))}
                                                                </TextField>

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
                                         :
                                        <Card className={classes2[cardAnimaton]}>
                                                <form className={classes2.form}>
                                                        <CardHeader color="primary" className={classes2.cardHeader}>
                                                                <h4>FACILITY DETAILS</h4>
                                                        </CardHeader>
                                                        <CardBody>
                                                                <CustomInput
                                                                    labelText="Name*..."
                                                                    id="name"
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            value: facilityDetails.name,
                                                                            onChange: handleFacilityChange("name"),
                                                                            type: "text",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <People className={classes2.inputIconsColor} />
                                                                                </InputAdornment>
                                                                            )
                                                                    }}
                                                                />
                                                                <CustomInput
                                                                    labelText="Owner*..."
                                                                    id="owner"
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            value: facilityDetails.owner,
                                                                            onChange: handleFacilityChange("owner"),
                                                                            type: "text",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <People className={classes2.inputIconsColor} />
                                                                                </InputAdornment>
                                                                            )
                                                                    }}
                                                                />
                                                                <CustomInput
                                                                    labelText="Address*..."
                                                                    id="address"
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            value: address,
                                                                            onChange: handleAddressChange,
                                                                            type: "text",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <AddLocationIcon onClick={pickLocation} className={classes2.inputIconsColor} />
                                                                                </InputAdornment>
                                                                            ),
                                                                            autoComplete: "off"
                                                                    }}
                                                                />
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
                                                        </CardBody>
                                                        <CardFooter className={classes2.cardFooter}>
                                                                <Button onClick={postFacility} className={classes.submitButton}>
                                                                        NEXT
                                                                </Button>
                                                        </CardFooter>
                                                </form>
                                        </Card>
                                    }


                            </GridItem>
                    </GridContainer>

                    <Dialog
                        open={LocationPicker}
                        PaperProps={{
                                style: {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        scrollbarColor: "transparent"
                                },
                        }}
                        onClose={handleLocationClose}
                    >
                            <MapExtreme center={latLong} submitFunc={submitLocationDetails}/>

                    </Dialog>

                    <Snackbar open={reqDet} autoHideDuration={6000} onClose={() => setReqDet(false)}>
                            <Alert onClose={() => setReqDet(false)} severity="error">
                                    Please Fill all Required Details
                            </Alert>
                    </Snackbar>


            </div>
        )

}

export default AddFacilityDialog
