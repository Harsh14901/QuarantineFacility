import axios from 'axios'

const getFacilityName = (callback,id) => {
        const endpt = 'http://127.0.0.1:8000/facilities/'+id;
        let lookupOpts = {
                method: 'GET',
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

export default getFacilityName
