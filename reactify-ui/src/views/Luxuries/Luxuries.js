import React, {forwardRef, useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import GetFacilityData from "facility/GetFacilityData";
import CustomTable from "components/CustomTable";
import GetPeopleData from "PeopleData/GetPeopleData";
import MapExtreme from "views/Maps/MapExtreme";
import Dialog from "@material-ui/core/Dialog";
import UserDetails from "views/UserProfile/UserDetails";
import getData from "facility/getData";
import MaterialTable from "material-table";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import postData from "facility/postData";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {Add} from "@material-ui/icons";
import {DOMAIN, TableIcons} from "variables/Constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const styles = {
        cardCategoryWhite: {
                color: "rgba(255,255,255,.62)",
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                marginBottom: "0"
        },
        cardTitleWhite: {
                color: "#FFFFFF",
                marginTop: "0px",
                minHeight: "auto",
                fontWeight: "300",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                marginBottom: "3px",
                textDecoration: "none"
        }
};

const useStyles = makeStyles(styles);

export default function Luxuries() {





        const classes = useStyles();
        const [medicineData,setMedicineData]=useState([]);
        const [dataDisplay,setDataDisplay] = useState([]);
        const [openDialog,setOpenDialog] = useState(false);
        const [newMedName,setNewMedName] = useState("");
        const [newMedCost,setNewMedCost] = useState("");
        const [loading,setLoading] = useState(false);

        const columnsHeading=[
                { title: 'ID', field: 'id'},
                { title: 'Luxury Category', field: 'category' },
                { title: 'Cost', field: 'cost' },
        ];
        function getMedicineData() {
                const callback = result => {
                        setLoading(false);
                        console.log(result);
                        setMedicineData(result);

                        console.log(result);
                        setDataDisplay(result);
                };
                setLoading(true);
                getData(callback,DOMAIN + '/luxuries/')
        }


        function handleDialogClose(){
                setOpenDialog(false)
        }

        function addMedicine(){
                const callback = res =>{
                        console.log("Luxury added",res);
                        medicineData.push(res);
                        handleDialogClose();

                };
                let data = {category: newMedName,cost: parseInt(newMedCost)};
                console.log(data);
                postData(callback,data,DOMAIN + '/luxuries/')
        }

        useEffect(() => {
                getMedicineData();
        }, []);




        return (
            <div>
                    <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                            <CardHeader color="primary">
                                                    <h4 className={classes.cardTitleWhite}>
                                                            Luxuries' Details
                                                    </h4>
                                                    <p className={classes.cardCategoryWhite}>
                                                            List of Luxuries
                                                    </p>
                                            </CardHeader>
                                            <CardBody>
                                                    <MaterialTable
                                                        icons={TableIcons}
                                                        title=""
                                                        columns={columnsHeading}
                                                        data={dataDisplay}
                                                        actions={[
                                                                {
                                                                        icon: Add,
                                                                        tooltip: 'Add Luxury',
                                                                        isFreeAction: true,
                                                                        onClick: (event) => setOpenDialog(true)
                                                                }
                                                        ]}
                                                    />
                                                    <Backdrop open={loading} style={{zIndex: "100"}} onClick={() => setLoading(false)}>
                                                            <CircularProgress color="inherit" />
                                                    </Backdrop>
                                            </CardBody>
                                    </Card>
                            </GridItem>
                    </GridContainer>



                    <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Add a Medicine</DialogTitle>
                            <DialogContent>

                                    <TextField
                                        autoFocus
                                        value={newMedName}
                                        onChange={(e) => setNewMedName(e.target.value)}
                                        margin="dense"
                                        id="name"
                                        label="Luxury Name"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        value={newMedCost}
                                        onChange={(e) => setNewMedCost(e.target.value)}
                                        margin="dense"
                                        id="cost"
                                        label="Cost"
                                        type="number"
                                        fullWidth
                                    />
                            </DialogContent>
                            <DialogActions>
                                    <Button onClick={handleDialogClose} color="primary">
                                            Cancel
                                    </Button>
                                    <Button onClick={addMedicine} color="primary">
                                            Submit
                                    </Button>
                            </DialogActions>
                    </Dialog>


            </div>
        );
}
