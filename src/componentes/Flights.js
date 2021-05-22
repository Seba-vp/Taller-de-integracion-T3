import React, {useState, useEffect} from 'react';
import socket from './Socket';
import '../App.css';
import Popup from './Popup';
import MapView from './Map';



const Flights = () => {

    const [flightsList, setFlights] = useState([]);
    const [planesPositions, setPlanesPositions] = useState([]);

    const [buttonPopup, setButtonPoup] = useState(false);
    const [currentPlane, setCurrentPlane] = useState([]);


 
    // FLIGHTS LIST
    useEffect(() => {
        //const interval = setInterval(() => {

            socket.emit('FLIGHTS');
            socket.on('FLIGHTS', flightsListUpdated => {
                setFlights(flightsListUpdated);
            });
            
            socket.on('POSITION', plane => {
                var planes2 = planesPositions
                var similar_plane = planes2.find(x => x.code === plane.code)
    
                if (typeof(similar_plane) !== "undefined"){
                    
                    planes2[planes2.indexOf(similar_plane)] = plane;
                    setPlanesPositions(planes2);
    
                }else {
                    setPlanesPositions([...planesPositions, plane]);
                    }          
            });
        //}, 1000);
            
        return () => {socket.off()}
    }, [flightsList, planesPositions]);

    //console.log("DESDE FLIGHT")
    //console.log(flightsList)


    return (
        <div className="flights">
            <div className="title">
                <h1>Vuelos</h1>
            </div>
            
            <div className="map-container">

     
            
            <MapView 
                positions ={planesPositions}
                flights = {flightsList}
             />
            
            
            </div>



            <div className="flightsList">

                <div className="title">
                    <h1>Informacion de los Vuelos</h1>
                </div>

                <div className="card-container">
                    
                    {flightsList.map((e,i)=> 
                    <div key={i} className="card">
                        <div><h3>Codigo: {e.code}</h3></div>
                        <div><p>Aerolinea: {e.airline}</p></div>
                        <div><p>Origen: {e.origin}</p></div> 
                        <div><p>Destino: {e.destination}</p></div> 
                        <div><p>Avión: {e.plane}</p></div>
                        <div><p>Asientos: {e.seats}        <button onClick={()=> {setButtonPoup(true); setCurrentPlane(e.passengers)}}>Ver pasajeros</button></p></div>
                      

                    </div>
                    
                    )}
            
                </div>
            </div>


            <Popup trigger={buttonPopup} setTrigger={setButtonPoup}>
            <h3>Pasajeros</h3>
            <div className="passenger-list">
            {currentPlane.map((e,i)=>
                <div key={i} className="passenger">
                    <div>{e.name}   {e.age}</div>
                </div>
            )}
            </div>
            </Popup>

        </div>


    );
};

export default Flights


/*
       {planesPositions.map((e,i)=> 
                    <div key={i} >
                        <div>{e.code}</div>
                        <div>{e.position}</div>
                    </div>        
             )}
*/