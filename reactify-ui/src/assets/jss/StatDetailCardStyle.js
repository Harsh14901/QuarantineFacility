import {grayColor} from "assets/jss/material-dashboard-react";

const style={
        cardCategory: {
                color: grayColor[0],
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                paddingTop: "10px",
                marginBottom: "0"
        },
        cardTitle: {
                color: grayColor[2],
                marginTop: "0px",
                minHeight: "auto",
                fontWeight: "300",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                marginBottom: "3px",
                textDecoration: "none",
                "& small": {
                        color: grayColor[1],
                        fontWeight: "400",
                        lineHeight: "1"
                }
        },
        stats: {
                color: grayColor[0],
                display: "inline-flex",
                fontSize: "12px",
                lineHeight: "22px",
                "& svg": {
                        top: "4px",
                        width: "16px",
                        height: "16px",
                        position: "relative",
                        marginRight: "3px",
                        marginLeft: "3px"
                },
        }

};

export default style;
