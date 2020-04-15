import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

const changeUserWard = (callback,data) => {

        const endpt = 'http://127.0.0.1:8000/person-accomodation/'+data.id;
        let dataToPatch={risk:data.risk};
        let lookupOpts = {
                method:'PATCH',
                headers:{
                        'Content-Type':'application/json',
                        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
                        'Accept': 'application/json'
                }
        };
        axios.patch(endpt, dataToPatch,lookupOpts). then(r => callback(data)).catch(function(error){console.log("hi",error)})

};

export default changeUserWard
