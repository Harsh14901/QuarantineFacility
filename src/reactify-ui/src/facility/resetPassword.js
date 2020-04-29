import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";
import {DOMAIN} from "variables/Constants";

const PostData = (callback,data,token) => {

        let lookupOpts = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                },
        };
        axios.post(DOMAIN + '/rest-auth/password/reset/confirm/', data,lookupOpts). then(r => callback(r.data)).catch(function(error){callback(error)})

};

export default PostData
