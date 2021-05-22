import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import '../App.css';


const MapView = ({positions, flights})=> {

    const planeIcon = new L.icon({
        iconUrl: "https://image.flaticon.com/icons/png/512/2979/2979504.png",//require("../public/plane.png")
        iconSize: [40,40],
    });

    const redOptions = { color: 'red' }

    //console.log("DESDE MAP")
    //console.log(positions)
    //console.log(flights)
    
    //const [positionList, setPositionList ]= useState(positions)
    // const [sePuede, setSePuede] = useState(false);

    // useEffect(() => {
    //     var vuelos = mapData[0] 
    //     if (!vuelos.lenght){
    //         setSePuede(false) 
    //     }else {
    //         setSePuede(true) 
    //     };
    // }, [sePuede]);


    return  <MapContainer className="leaflet-container" center={[-33.4489, -70.6693]} zoom={5} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {positions.map((p)=>
        <Marker position={p.position} icon={planeIcon}>
            <Popup>
                Vuelo {p.code}.
            </Popup>
        </Marker>
    )};
    
    {
    
    
    flights.map((f) =>
        <>
            <Marker position={f.origin}>
                <Popup>
                    Origen {f.origin}.
                </Popup>
            </Marker>
            

            <Marker position={f.destination}>
                <Popup>
                    Destino {f.destination}
                </Popup>
            </Marker>


            <Polyline pathOptions={redOptions} positions={[f.origin,f.destination]} />
        </>
    )
    };
    
  </MapContainer>
};

export default MapView

// [33.4489, 70.6693]