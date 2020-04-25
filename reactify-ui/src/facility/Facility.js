import React, { Component } from 'react';
import FacilityData from './FacilityData'
import cookie from 'react-cookies'

class Facility extends Component {
  state={
    facilities:[]
  };


  getFacilities(){
    let thisFacility = this;
    const endpt = '/facilities/';
    let lookupOpts = {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      }
    };
    fetch(endpt,lookupOpts).then(function(responnse){
      return responnse.json()
    }).then(function(data){
      console.log(data)
      thisFacility.setState({
        facilities:data
      })
    }).catch(function(error){
      console.error(error)
    })
  }

  postFacility(){
    const endpt = '/facilities/';
    const csrf = cookie.load('csrftoken');
    let facility = {
      //
    }
    if(csrf !== undefined){
      let lookupOpts = {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'X-CSRFToken': csrf
        },
        body:JSON.stringify(facility),
        credentials:'include'
      }
    }
  }

  componentDidMount(){
    this.setState({
      facilities:[]
    })
    this.getFacilities();
  }

  render() {
    const {facilities} = this.state;
    return (
      <div>
        <p>hello world this is a list of all facilities</p>
        {facilities.length > 0 ? facilities.map((facility,index)=>{
          return (<FacilityData name = {facility.name}/>)
        }):<p>No Facilities exist</p>}
      </div>
    );
  }
}

export default Facility;
