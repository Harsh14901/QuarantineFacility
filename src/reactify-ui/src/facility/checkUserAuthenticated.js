import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

const checkUserAuthenticated = (callback) => {

        let lookupOpts = {
                method:'GET',
                withCredentials: true
        };
        axios.get('http://127.0.0.1:8000/rest-auth/user/',lookupOpts). then(r => callback(r.data)).catch(function(error){console.log("hi",error.data)})

};

export default checkUserAuthenticated
