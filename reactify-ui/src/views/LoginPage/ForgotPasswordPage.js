import image from "assets/img/login_back.jpg";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button";
import React, {useEffect, useState} from "react";
import resetPassword from "facility/resetPassword";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage";
import {useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


const useStyles = makeStyles(styles);

export default function ForgotPasswordPage(){
        const classes = useStyles();
        const [password,setPassword] = useState("");
        const [password2,setPassword2] = useState("");
        const [uid,setUid] = useState("");
        const [token,setToken] = useState("");
        const [msgOpen,setMsgOpen] = useState(false);
        const [msgSuccess,setMsgSuccess] = useState(false);
        const [msgSame,setMsgSame] = useState(false);
        const [loading,setLoading] = useState(false);
        const history = useHistory();


        function handleAlertClose() {
                setMsgOpen(false);
                setMsgSuccess(false);
                setMsgSame(false);
        }


        function submitDetails(){
                const callback = res => {
                        setLoading(false);
                        res=JSON.stringify(res);
                        console.log('password has beene reset',res,res.indexOf("Error"!==-1));
                        if(res.indexOf("Error")!==-1){
                                setPassword2("");
                                setPassword("");
                                setMsgOpen(true);
                        }
                        else{
                                console.log("Should work");
                                setMsgSuccess(true);
                                setTimeout(function() {
                                        history.push('/login');
                                }, 2000);

                        }

                };
                if(password2!==password)
                {
                        setMsgSame(true);
                        return;
                }
                const data = {new_password1: password,new_password2: password2,uid: uid,token: token};
                console.log(JSON.stringify(data));
                setLoading(true);
                resetPassword(callback,data,token);


        }

        const handleChange = (id) => (event) => {
                if(id==='password')
                        setPassword(event.target.value);
                if(id==='password2')
                        setPassword2(event.target.value)
        };

        useEffect(() => {
                console.log("here is the current link",window.location.href)
                let url = window.location.href;
                let ind = url.indexOf("confirm/")+8;
                if(url.charAt(url.length-1)==='/')
                        url = url.substring(0,url.length-1);
                setUid(url.substring(ind,url.indexOf("/",ind)));
                setToken(url.substring(url.lastIndexOf("/")+1));
                console.log("uid is ",uid);
                console.log("token is",token);
        }, []);

        return(
            <div style={{backgroundImage: "url(" + image + ")",backgroundSize: "cover",display: "flex",justifyContent: "center",alignItems:"center",height: "100vh"}}>
                    <GridContainer justify="center" >
                            <GridItem xs={12} sm={12} md={10}>
                                    <Card >
                                                <form className={classes.form}>
                                                        <CardHeader color="primary" className={classes.cardHeader}>
                                                                <h4>Reset Password</h4>

                                                        </CardHeader>
                                                        <CardBody>
                                                                <CustomInput
                                                                    labelText="New Password"
                                                                    id="pass"
                                                                    value={password}
                                                                    onChange={handleChange('password')}
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            onChange: handleChange("password"),
                                                                            value: password,
                                                                            type: "password",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <HttpsOutlinedIcon className={classes.inputIconsColor} />
                                                                                </InputAdornment>
                                                                            ),
                                                                            autoComplete: "off"
                                                                    }}
                                                                />
                                                                <CustomInput
                                                                    labelText="Re-Confirm New Password"
                                                                    id="pass2"
                                                                    value={password2}
                                                                    onChange={handleChange('password2')}
                                                                    formControlProps={{
                                                                            fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                            onChange: handleChange("password2"),
                                                                            value: password2,
                                                                            type: "password",
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <HttpsOutlinedIcon className={classes.inputIconsColor} />
                                                                                </InputAdornment>
                                                                            ),
                                                                            autoComplete: "off"
                                                                    }}
                                                                />

                                                        </CardBody>
                                                        <CardFooter className={classes.cardFooter}>
                                                                <Button onClick={submitDetails} simple color="primary" size="lg">
                                                                        CHANGE PASSWORD
                                                                </Button>
                                                        </CardFooter>
                                                </form>
                                        </Card>
                            </GridItem>
                    </GridContainer>
                    <Backdrop open={loading} style={{zIndex: "100"}}>
                            <CircularProgress color="inherit" />
                    </Backdrop>
                    <Snackbar open={msgOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error">
                                    Error Occured!!!
                            </Alert>
                    </Snackbar>
                    <Snackbar open={msgSuccess} autoHideDuration={6000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success">
                                    Password Reset Successful
                            </Alert>
                    </Snackbar>
                    <Snackbar open={msgSame} autoHideDuration={5000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error">
                                    Passwords Dont Match
                            </Alert>
                    </Snackbar>
            </div>
        )
}
