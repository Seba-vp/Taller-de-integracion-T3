import React, {useState, useEffect , useRef} from 'react';
//import Socket from './Socket';
import socket from './Socket';
import '../App.css';
import Popup from './Popup';



const Flights = () => {

    const [flightsList, setFlights] = useState([]);
    const [planesPositions, setPlanesPositions] = useState([]);
    const [planesRoutes, setPlanesRoutes] = useState([]);


    const [buttonPopup, setButtonPoup] = useState(false);
    const [currentPlane, setCurrentPlane] = useState([]);

 
    // FLIGHTS LIST
    useEffect(() => {

            socket.emit('FLIGHTS');
            socket.on('FLIGHTS', flightsListUpdated => {
                setFlights(flightsListUpdated);
            });
            return () => {socket.off()}
    }, [flightsList]);

    //cargamos las rutas
    //var aux_planesRoutes = []
    //for (const f in flightsList){
    //    aux_planesRoutes.push({code: f.code, origin: f.origin, destination: f.destination, position: []})
    //}
    //setPlanesRoutes(aux_planesRoutes)
    //console.log(planesRoutes)
   
    //POSITION MAP
    useEffect(()=> {
    
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

        //return () => {socket.off()}
    }, [planesPositions]);

    



    return (
        <div className="flights">
            <div className="title">
                <h1>Vuelos</h1>
            </div>
            
            <div className="map">

            {planesPositions.map((e,i)=> 
                    <div key={i} >
                        <div>{e.code}</div>
                        <div>{e.position}</div>
                    </div>        
             )}

            </div>



            <div className="flightsList">

                <div className="title">
                    <h1>Informacion de los Vuelos</h1>
                </div>

                <div className="card-container">
                    
                    {flightsList.map((e,i)=> 
                    <div key={i} className="card">
                        <div>{e.code}</div>
                        <div>{e.airline}</div>
                        <div>{e.origin}</div> 
                        <div>{e.destination}</div> 
                        <div>{e.plane}</div>
                        <div>{e.seats}</div>
                        <button onClick={()=> {setButtonPoup(true); setCurrentPlane(e.passengers)}}>Ver pasajeros</button>

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