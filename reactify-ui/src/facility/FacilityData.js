import React, { Component } from 'react'; 

class FacilityData extends Component {
  render() {
      const {name} = this.props
    return (
      <p>Name- {name} </p>
    );
  }
}

export default FacilityData;
