import cookie from "react-cookies";
import axios from 'axios';
import {func} from "prop-types";

const changeUserFacility = (callback,data) => {

        const endpt = 'http://127.0.0.1:8000/person-accomodation/'+data.id+'/';
        let dataToPatch={facility_pk: data.facility_pk};
        console.log(JSON.stringify(dataToPatch));
        let lookupOpts = {
                method:'PATCH',
                headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json'
                },
                withCredentials: true
        };
        axios.patch(endpt,dataToPatch, lookupOpts). then(r => callback(data)).catch(function(error){console.log("hi",error)})

};

export default changeUserFacility
