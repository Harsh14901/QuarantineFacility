import axios from 'axios'
import {DOMAIN} from "variables/Constants";

const getFacilitiesList = (callback,data) => {
        const endpt = DOMAIN + '/get_nearest_facilities/';
        console.log("hi its pranjal here",JSON.stringify(data));
        let lookupOpts = {
                method: 'GET',
                params: data,
                headers:{
                        'Content-Type':'application/json'
                },
                withCredentials: true
        };
        axios.get(endpt,lookupOpts).then(function(response){
                return response.data
        }).then(function(data){
                return data

        }).then(res => callback(res))
            .catch(function(error){
                    console.error(error)
            })

};

export default getFacilitiesList
