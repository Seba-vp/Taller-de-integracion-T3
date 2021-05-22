import React, {useState, useEffect , useRef} from 'react';
import socket from './Socket';
import '../App.css';



const Chat = ({ name }) => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('CHAT', message => {
            setMessages([...messages, message]);
        })
    

        //return () => {socket.off()}
    }, [messages]);

    const divRef = useRef(null);
    useEffect(() =>{
        divRef.current.scrollIntoView({behavior: 'smooth'});
    });

    const submit = (e) => {
        e.preventDefault();
        socket.emit('CHAT', {name, message});
        setMessage("");
    };

    return (
        <div className="chatBox">
            <div className="title">
                <h1>Chat</h1>
            </div>

            <div className="chat">
                {messages.map((e,i)=> <div key={i}> 
                    <div>{e.name} </div> 
                    <div>{(new Date(e.date)).toLocaleTimeString()}</div> 
                    <div>{e.message} </div>
                </div>
                )}
                <div ref={divRef}></div>
            </div>


            <form onSubmit={submit}>
                <label htmlFor=""> </label>
                <input  value= {message} onChange = {(e) => setMessage(e.target.value)}/>

                <button>Enviar</button>
            </form>
            
        </div>


    );
};

export default Chat