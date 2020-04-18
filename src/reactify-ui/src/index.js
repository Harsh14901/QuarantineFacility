/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./index.css"

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import LoginPage from "views/LoginPage/LoginPage";
import {CookiesProvider} from "react-cookie";

const hist = createBrowserHistory();

ReactDOM.render(
<CookiesProvider>

    <Router history={hist}>
    <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/login" />
    </Switch>
  </Router>
</CookiesProvider>,
  document.getElementById("root")
);
