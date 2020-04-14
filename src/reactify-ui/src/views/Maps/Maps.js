import React, {useEffect} from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

const Wrapper = styled.div`
        width: ${props => props.width },
        height: ${props => props.height}
`;



export default function Maps() {

        useEffect(() => {
                let mapper=L.map('map',{
                        center: [26,78],
                        zoom: 6,
                        zoomControl: false
                    }
                    );
                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                         detectRetina: true,
                         maxZoom: 20,
                         maxNativeZoom: 17
                 }).addTo(mapper);
                // L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                //         maxZoom: 18,
                //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // }).addTo(map)
        }, []);




        return(
            <div>
                    <h1>HI HOW ARE U</h1>
            <Wrapper width='1280px' height='720px' id='map'/>
            </div>
        )
}







// import React from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";
//
// const CustomSkinMap = withScriptjs(
//   withGoogleMap(() => (
//     <GoogleMap
//       defaultZoom={13}
//       defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
//       defaultOptions={{
//         scrollwheel: false,
//         zoomControl: true,
//         styles: [
//           {
//             featureType: "water",
//             stylers: [
//               { saturation: 43 },
//               { lightness: -11 },
//               { hue: "#0088ff" }
//             ]
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.fill",
//             stylers: [
//               { hue: "#ff0000" },
//               { saturation: -100 },
//               { lightness: 99 }
//             ]
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.stroke",
//             stylers: [{ color: "#808080" }, { lightness: 54 }]
//           },
//           {
//             featureType: "landscape.man_made",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ece2d9" }]
//           },
//           {
//             featureType: "poi.park",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ccdca1" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.fill",
//             stylers: [{ color: "#767676" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.stroke",
//             stylers: [{ color: "#ffffff" }]
//           },
//           { featureType: "poi", stylers: [{ visibility: "off" }] },
//           {
//             featureType: "landscape.natural",
//             elementType: "geometry.fill",
//             stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
//           },
//           { featureType: "poi.park", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.sports_complex",
//             stylers: [{ visibility: "on" }]
//           },
//           { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.business",
//             stylers: [{ visibility: "simplified" }]
//           }
//         ]
//       }}
//     >
//       <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
//     </GoogleMap>
//   ))
// );
//
// export default function Maps() {
//   return (
//     <CustomSkinMap
//       googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
//       loadingElement={<div style={{ height: `100%` }} />}
//       containerElement={<div style={{ height: `100vh` }} />}
//       mapElement={<div style={{ height: `100%` }} />}
//     />
//   );
// }
