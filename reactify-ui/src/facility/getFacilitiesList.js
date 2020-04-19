import axios from 'axios'

const getFacilitiesList = (callback,data) => {
        const endpt = 'http://127.0.0.1:8000/get_nearest_facilities/';
        console.log(JSON.stringify(data));
        let lookupOpts = {
                method: 'GET',
                params: data,
                headers:{
                        'Content-Type':'application/json'
                }
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
