import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";
import {DOMAIN} from "variables/Constants";

const PatchData = (callback,data,url) => {

        let lookupOpts = {
                method:'PATCH',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                },
                withCredentials: true
        };
        axios.patch(url, data,lookupOpts). then(r => callback(data)).catch(function(error){console.log("hi",error)})

};

export default PatchData
