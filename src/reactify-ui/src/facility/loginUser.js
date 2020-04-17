import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

const loginUser = (callback,data,url) => {

        let lookupOpts = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                }
        };
        axios.post(url, data,lookupOpts). then(r => callback(r.data)).catch(function(error){console.log("hi",error.data)})

};

export default loginUser
