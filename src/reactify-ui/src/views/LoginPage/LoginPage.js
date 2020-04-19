import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
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


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [step,setStep] = useState(1);

        const history = useHistory();


        function resetPassword(){
                const callback = res => {
                        console.log("Password reset successful",res)
                };
                postData(callback,{email: email},'http://127.0.0.1:8000/rest-auth/password/reset/')
        }


        function submitDetails(){
                const callback = result => {

                        console.log("And here I have the login token",result)
                        history.push('/admin')
                };

                let data={username: name,email: email,password: password};
                console.log("Here is the data",JSON.stringify(data));
                loginUser(callback,data,'http://127.0.0.1:8000/rest-auth/login/')
        }

        function isAuthenticated(){
                const callback = res => {
                        if(res.username)
                                history.push('/admin')
                };
                console.log("YOYYOOYOHBJHBJ");
                checkUserAuthenticated(callback,{},'http://127.0.0.1:8000/rest-auth/user/')
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
    </div>
  );
}
