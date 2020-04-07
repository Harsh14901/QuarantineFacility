/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import SportsIcon from "assets/img/icons/cup.js";
import MessIcon from "assets/img/icons/eat.js";
import MaintenanceIcon from "assets/img/icons/repair.js";
import LoginIcon from "assets/img/icons/login.js";
import TeamIcon from "assets/img/icons/group.js";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import {Icon} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
            <Button
                href=""
                color="transparent"
                target="_blank"
                className={classes.navLink}
            ><MessIcon/>Mess
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href=""
                color="transparent"
                target="_blank"
                className={classes.navLink}
            ><MaintenanceIcon/>Maintenance
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href=""
                color="transparent"
                target="_blank"
                className={classes.navLink}
            >Culture
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href=""
                color="transparent"
                target="_blank"
                className={classes.navLink}
            ><SportsIcon/>Sports
            </Button>
        </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
        ><TeamIcon/>Team
        </Button>
      </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href=""
                color="transparent"
                target="_blank"
                className={classes.navLink}
            >Pinnache
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href=""
                color="transparent"
                target="_blank"
                className={classes.navLink}
            ><LoginIcon/>Login
            </Button>
        </ListItem>
    </List>
  );
}
