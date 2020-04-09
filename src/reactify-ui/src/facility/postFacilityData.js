import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

function PostFacilityData() {

        const endpt = 'http://127.0.0.1:8000/facilities/';
                let lookupOpts = {
                        method:'POST',
                        headers:{
                                'Content-Type':'application/json',
                                'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0'
                        }
                };
                axios.post(endpt, {
                        "category": "family",
                        "count": 4,
                        "facility_preference": 11
                },lookupOpts). then(r => console.log(r)).catch(function(error){console.log(error)})

}

export default PostFacilityData
