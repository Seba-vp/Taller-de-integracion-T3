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
  return (
    <main>
      <div className="App">
      
        <div className='leftBox'>
          <Flights />
        </div>

        <div className='rightBox'>
          {
            !registrado &&

            <div className="login">
            <form onSubmit={registrar}>
              <label htmlFor=""></label>
              <h1>Nickname:</h1>
              <br/>
              <input value = {name} onChange = {e => setName(e.target.value)}  className="input"/>
              <br/>
              <br/>
              <button className="inputButton">Chatear</button>
            </form>
            </div>
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
