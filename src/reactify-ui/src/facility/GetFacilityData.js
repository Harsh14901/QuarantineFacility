import axios from 'axios'

function getFacilityData() {
        const endpt = 'http://127.0.0.1:8000/facilities/';
        let lookupOpts = {
                method: 'GET',
                headers:{
                        'Content-Type':'application/json'
                }
        };
        axios.get(endpt,lookupOpts).then(function(response){
                return response.data
        }).then(function(data){
                console.log("Ok I print data I got from server");
                console.log(data);

        }).catch(function(error){
                console.error(error)
        })

}

export default getFacilityData
