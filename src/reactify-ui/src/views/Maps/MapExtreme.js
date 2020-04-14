import React, {useState} from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
import "./app.css";
import ReactLeafletSearch from "react-leaflet-search";
import {Button} from "@material-ui/core";






export default function MapExtreme(props) {

        let LatLong ={lat: 23.4,lng: 78.7};

        function customPopup(SearchInfo) {
                console.log(SearchInfo);
                // LatLong=SearchInfo.latLng;
                props.setLatLong(SearchInfo.latLng);
                return(
                    <Popup>
                            <div>
                                    {/*<p>I am a custom popUp</p>*/}
                                    {/*<p>latitude and longitude from search component: {SearchInfo.latLng.toString().replace(',',' , ')}</p>*/}
                                    <p>{SearchInfo.info}</p>
                                    <p>{SearchInfo.raw && SearchInfo.raw.place_id && JSON.stringify(SearchInfo.raw.place_id)}</p>
                            </div>
                    </Popup>
                );
        }

        const SearchComponent = (props) => <ReactLeafletSearch className="custom-style" popUp={customPopup}
            position="topleft"
            inputPlaceholder="The default text in the search bar"
            search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
            zoom={15} // Default value is 10
            showMarker={true}
            showPopup={true}
            openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
            closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
            providerOptions={{searchBounds: []}} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
            customProvider={undefined | {search: (searchString)=> {}}} // see examples to usage details until docs are ready
        />;

        return (
            <div>
                    <Map center={[23.4, 78.7]} zoom={12} >
                    <SearchComponent/>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
                    <Button style={{
                            background: 'linear-gradient(45deg, #A742B9 30%, #9026AB 90%)',
                            border: 0,
                            borderRadius: 3,
                            marginRight: "20px",
                            boxShadow: '0 3px 5px 2px rgba(167, 66, 185, .3)',
                            color: 'white',
                            padding: '10px 30px',
                            width: "100%"
                    }}>SAVE</Button>

            </div>
        );
}
