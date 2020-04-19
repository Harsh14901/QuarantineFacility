import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";
import {DOMAIN} from "variables/Constants";

const PostGroupData = (callback,data) => {

        const endpt = DOMAIN + '/allocate/';
        let lookupOpts = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                },
                withCredentials: true
        };
        axios.post(endpt, data,lookupOpts). then(r => callback(data)).catch(function(error){console.log("hi",error)})

};

export default PostGroupData
