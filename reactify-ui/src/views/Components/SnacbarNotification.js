import Snackbar from "components/Snackbar/Snackbar";
import Notifications from "views/Notifications/Notifications";
import React, {useEffect, useState} from "react";
import AddAlert from "@material-ui/icons/AddAlert";

export default function SnackbarNotification(props) {


        return(
                <div>
                        <Snackbar
                            place="bc"
                            color={props.error?"error":"success"}
                            icon={AddAlert}
                            message={props.text?props.text:props.error?"Error":"Success"}
                            open={props.open}
                            autoHideDuration={6000}
                            closeNotification={() => props.setOpen(false)}
                            close
                        />
                </div>
        )
}
