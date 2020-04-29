import React, {useEffect, useState} from "react";

// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/login_back.jpg";

import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import postData from "facility/postData";
import checkUserAuthenticated from "facility/checkUserAuthenticated";
import getData from "facility/getData";
import { useHistory } from 'react-router-dom';
import loginUser from "facility/loginUser";
import {DOMAIN} from "variables/Constants";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [step,setStep] = useState(1);
  const [loading,setLoading] = useState(false);
  const [succMsg,setSuccMsg] = useState(false);
  const [failMsg,setFailMsg] = useState(false);
  const [msgText,setMsgText] = useState("Login Failed");
        const history = useHistory();

        function handleAlertClose() {
                setSuccMsg(false);
                setFailMsg(false);
        }

        function resetPassword(){
                const callback = res => {
                        setLoading(false);
                        console.log("Password reset successful",res);
                        setSuccMsg(true);
                        setMsgText("Password reset details have been sent to email");
                        setStep(1);
                };
                setLoading(true);
                postData(callback,{email: email},DOMAIN + '/rest-auth/password/reset/')
        }


        function submitDetails(){
                const callback = result => {
                        setLoading(false);
                        result = JSON.stringify(result);
                        if(result.indexOf("Error")!==-1){
                                setPassword("");
                                setFailMsg(true);
                                setMsgText("Login Failed");
                        }else {
                                console.log("And here I have the login token", result)
                                history.push('/admin')
                        }
                };
                setLoading(true);

                let data={username: name,email: email,password: password};
                console.log("Here is the data",JSON.stringify(data));
                loginUser(callback,data,DOMAIN + '/rest-auth/login/')
        }

        function isAuthenticated(){
                const callback = res => {
                        if(res.username)
                                history.push('/admin')
                };
                console.log("YOYYOOYOHBJHBJ");
                checkUserAuthenticated(callback,{},DOMAIN + '/rest-auth/user/')
        }

        const handleChange = (id) => (event) => {
                if(id==='email')
                        setEmail(event.target.value);
                if(id==='name')
                        setName(event.target.value);
                if(id==='password')
                        setPassword(event.target.value)
        };

        useEffect(() => {
                isAuthenticated();
        }, []);

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div style={{backgroundImage: "url(" + image + ")",backgroundSize: "cover",display: "flex",justifyContent: "center",alignItems:"center",height: "100vh"}}>
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={10}>
                    { step===1?<Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                        <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>

                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="User Name..."
                      id="first"
                      value={name}
                      onChange={handleChange('name')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                              onChange: handleChange("name"),
                              value: name,
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                              onChange: handleChange("email"),
                              value: email,
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
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
                  </CardBody>
                        <a  onClick={() => setStep(2)} style={{marginLeft: "15px",fontSize:"0.7rem"}}>
                                Forgot Password
                        </a>
                  <CardFooter className={classes.cardFooter}>
                    <Button onClick={submitDetails} simple color="primary" size="lg">
                      LOGIN
                    </Button>
                  </CardFooter>
                </form>
              </Card>:
                    <Card>
                            <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                            <h4>FORGOT PASSWORD</h4>

                                    </CardHeader>
                                    <CardBody>
                                            <CustomInput
                                                labelText="Email..."
                                                id="email"
                                                formControlProps={{
                                                        fullWidth: true
                                                }}
                                                inputProps={{
                                                        onChange: handleChange("email"),
                                                        value: email,
                                                        type: "email",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                    <Email className={classes.inputIconsColor} />
                                                            </InputAdornment>
                                                        )
                                                }}
                                            />

                                    </CardBody>

                                    <CardFooter className={classes.cardFooter}>
                                            <Button onClick={() => setStep(1)} simple color="primary" size="lg">
                                                    BACK
                                            </Button>
                                            <Button onClick={resetPassword} simple color="primary" size="lg">
                                                    RESET PASSWORD
                                            </Button>
                                    </CardFooter>
                            </form>

                    </Card>}
            </GridItem>
          </GridContainer>
            <Snackbar open={succMsg} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="success">
                            { msgText}
                    </Alert>
            </Snackbar>
            <Snackbar open={failMsg} autoHideDuration={5000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="error">
                            { msgText}
                    </Alert>
            </Snackbar>
            <Backdrop open={loading} style={{zIndex: "100"}}>
                    <CircularProgress color="inherit" />
            </Backdrop>
    </div>
  );
}
