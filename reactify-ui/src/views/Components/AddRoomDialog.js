import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import PhoneIcon from "@material-ui/icons/Phone";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import React, {useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import {makeStyles} from "@material-ui/core/styles";
import styles2 from "assets/jss/material-kit-react/views/loginPage";
import styles from "assets/jss/homeStyles";
import AreaIcon from "assets/img/icons/AreaIcon";
import CapacityIcon from "assets/img/icons/CapacityIcon";
import RoomIcon from "assets/img/icons/RoomIcon";


const useStyles2 = makeStyles(styles2);



const useStyles = makeStyles(styles);



export default function AddRoomDialog(props) {

        const classes=useStyles();
        const classes2=useStyles2();


        const defaultRoomState={ward: 0,category: 2,room_number: "",area: 0,capacity: 1};

        const [roomDetails,setRoomDetails] = useState([defaultRoomState]);

        const actions = [
                { icon: <AddIcon />, name: 'Add Room' },
                { icon: <DeleteIcon />, name: 'Delete Room' },
                { icon: <RestoreIcon />, name: 'Reset Room Details' },
        ];

        const [fabOpen, setFabOpen] = React.useState(false);


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

        const handleFabClose = (j,title) => (event) => {
                if (title===actions[0].name){
                        addRoom();
                }
                else if(title===actions[1].name){
                        deleteRoom(j);
                }
                // console.log(event);
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
                // console.log(roomDetails[j].name)

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
                                const id =(data.category===1)?props.ward1Id:props.ward2Id;
                                details.push({ward: id,category: data.category+"",room_num: parseInt(data2),floor: 0,area:data.area,capacity:data.capacity})
                        })
                });
                props.submitFunc(details);
                props.closeFunc();
                // console.log("Submitting Details",details)
        }

        return(
            <div className={classes.formDiv}>

                    <GridContainer justify="center" style={{width:"100%",marginLeft: "80px",marginRight: "80px"}}>
                            <GridItem xs={12} md={12}>
                                    <CustomTabs headerColor="primary" tabs={roomDetails.map((data2,j) => (
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
                                                                                    <RoomIcon color={"black"} />
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
                                                                                    <CapacityIcon size={"large"} className={classes2.inputIconsColor}>
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
            </div>


        )

}
