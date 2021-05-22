import './App.css';
import React, { useState }from 'react';
import socket from './componentes/Socket';
import Chat from './componentes/Chat';
import Flights from './componentes/Flights';




function App() {

  const [name, setName ] = useState("");

  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if(name !== ""){
      setRegistrado(true);
    }
  
  }

  socket.emit('conectado', "Hola hola");
  return (
    <main>
      <div className="App">
      
        <div className='leftBox'>
          <Flights />
        </div>

        <div className='rightBox'>
          {
            !registrado &&
            <form onSubmit={registrar}>
              <label htmlFor=""></label>
              <h3>Nickname:</h3>
              <input value = {name} onChange = {e => setName(e.target.value)}/>
              <button>Chatear</button>
            </form>
          }
          {
            registrado &&

            <Chat name ={name}/>
          }
        </div>
      </div>
    </main>
  );
}

export default App;
