import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

const PostGroupData = (callback,data) => {

        const endpt = 'http://127.0.0.1:8000/allocate/';
        let lookupOpts = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json',
                        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
                        'Accept': 'application/json'
                }
        };
        axios.post(endpt, data,lookupOpts). then(r => callback(data)).catch(function(error){console.log("hi",error)})

}

export default PostGroupData
