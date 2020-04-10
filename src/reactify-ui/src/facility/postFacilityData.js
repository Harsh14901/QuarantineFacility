import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

function PostFacilityData() {

        const endpt = 'http://127.0.0.1:8000/groups/';
                let lookupOpts = {
                        method:'PATCH',
                        headers:{
                                'Content-Type':'application/json',
                                'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0'
                        }
                };
                axios.patch(endpt, {
                        "category": "family",
                        "facility_preference": 3
                },lookupOpts). then(r => console.log(r)).catch(function(error){console.log(error)})

}

export default PostFacilityData
