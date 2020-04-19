import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";
import {DOMAIN} from "variables/Constants";

const PostFacilityData = (callback,data) => {

        const endpt = DOMAIN + '/facilities/';
        let lookupOpts = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                },
                withCredentials: true
        };
        axios.post(endpt, data,lookupOpts). then(r => callback(r.data)).catch(function(error){console.log("hi",error.data)})

};

export default PostFacilityData
