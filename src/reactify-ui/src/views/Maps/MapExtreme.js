import React, {useEffect, useState} from "react";
import { Map, Marker, Popup, TileLayer,GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import "./app.css";
import ReactLeafletSearch from "react-leaflet-search";
import {Button} from "@material-ui/core";
import getFacilityData from "facility/GetFacilityData";
import {latLng} from "leaflet/dist/leaflet-src.esm";



import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default function MapExtreme(props) {


        const position = props.center;

        const [LatLong,setLatLong] = useState({lat: position[0],lng: position[1]});
        const [markerPopup,setMarkerPopup] = useState("");

        const [marker,setMarker] = useState(position);


        const geoJsonFeature = {
                "type": "Feature",
                "properties": {
                        "name": "Coors Field",
                        "amenity": "Baseball Stadium",
                        "popupContent": "This is where the Rockies play!"
                },
                "geometry": {
                        "type": "Point",
                        "coordinates": [-104.99404, 39.75621]
                }
        };

        const [geojsonFeature,setGeojsonFeature] = useState([geoJsonFeature]);


        function savePosition() {
                props.submitFunc({marker: marker,info: markerPopup});
        }

        function getFacilitiesData(){
                const callback = res => {
                        let temp=[];
                        res.map((data) => {
                                let percent= (data.occupant_count*100/data.capacity).toFixed(0) +"%";
                                temp.push({"type": "Feature",
                                    "properties": {
                                        "name": data.name,
                                            "amenity": "Facility",
                                            "popupContent": "Facility ("+percent+" ) filled"
                                },
                                "geometry": {
                                        "type": "Point",
                                            "coordinates": [data.latitude, data.longitude]}}
                                )
                        });
                        console.log("Eureka",temp);
                        console.log("oereka",geoJsonFeature);
                        setGeojsonFeature(temp)
                };
                getFacilityData(callback)
        }


        function RealTimePass(SearchInfo){
                console.log("Haha",SearchInfo.latLng);
                addMarker(SearchInfo);
                // setLatLong(SearchInfo.latLng);
                // setMarker([SearchInfo.latLng.lat,SearchInfo.latLng.lng])

        }

        const addMarker = (e) => {
                try {
                        setMarker([e.latlng.lat, e.latlng.lng]);
                }catch (error) {
                        console.log("Yipee",e);
                        setMarker([e.latLng.lat,e.latLng.lng])
                }
                setMarkerPopup(e.info);
                console.log("HUHUHUHUH",e);
                setLatLong(e.latlng);

        };

        function customPopup(SearchInfo) {
                // console.log(SearchInfo);
                // // LatLong=SearchInfo.latLng;
                // props.setLatLong(SearchInfo.latLng);
                RealTimePass(SearchInfo);
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
            closeResultsOnClick={true} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
            providerOptions={{searchBounds: [{lat:8,lng: 70},{lat:35,lng: 90}]}} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
            customProvider={undefined | {search: (searchString)=> {}}} // see examples to usage details until docs are ready
        />;


        useEffect(() => {
                getFacilitiesData();
        }, []);
        return (
            <div>
                    <Map center={position} zoom={12} onClick={addMarker}>
                    <SearchComponent/>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                            <Marker position={marker}>
                                    <Popup>{markerPopup?markerPopup:"Selected Location"}</Popup>
                            </Marker>



                            {  geojsonFeature.map((data,idx) =>
                                    <Marker key={`marker-${idx}`} position={position} >
                                            <Popup>
                                                    <span>{"Name:- "+data.properties.name}<br/> {data.properties.popupContent}</span>
                                            </Popup>
                                    </Marker> )
                            }


                </Map>
                    <Button onClick={savePosition} style={{
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
