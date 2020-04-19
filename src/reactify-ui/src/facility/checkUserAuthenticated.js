import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";
import {DOMAIN} from "variables/Constants";

const checkUserAuthenticated = (callback) => {

        let lookupOpts = {
                method:'GET',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                },
                withCredentials: true
        };
        axios.get(DOMAIN + '/rest-auth/user/',lookupOpts). then(r => callback(r.data)).catch(function(error){callback({username: null})})

};

export default checkUserAuthenticated
