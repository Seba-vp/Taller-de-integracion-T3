import React, {useState, useEffect , useRef} from 'react';
import socket from './Socket';
import socketChat from './SocketChat';
import '../App.css';



const Chat = ({ name }) => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socketChat.on('CHAT', message => {
            setMessages([...messages, message]);
        })
    

        return () => {socketChat.off()}
    }, [messages]);

    const divRef = useRef(null);
    useEffect(() =>{
        divRef.current.scrollIntoView({behavior: 'smooth'});
    });

    const submit = (e) => {
        e.preventDefault();
        socketChat.emit('CHAT', {name, message});
        setMessage("");
    };


    const renderBubble = (e,i) => {
        if(e.name=== name){
            return( 
            <div key={i} className="container">
                <img src="https://image.flaticon.com/icons/png/512/4695/4695105.png" alt="Avatar"></img>
                <h3>{e.name}</h3>
                <p>{e.message}</p>
                <span class="time-right">{(new Date(e.date)).toLocaleTimeString()}</span>
            </div>
            )
            }
        else{
            return(
            <div key={i} className="container darker">
                <img src="https://image.flaticon.com/icons/png/512/3416/3416530.png" alt="Avatar" class="right"></img>
                <h3>{e.name}</h3>
                <p>{e.message}</p>
                <span class="time-left">{(new Date(e.date)).toLocaleTimeString()}</span>
            </div>
            )

            }

    };
        

    return (
        <div className="chatBox">
            <div className="title">
                <h1>Chat</h1>
                <br/>
            </div>

            <div className="chat">
                
                {
                messages.map((e,i)=>
                    renderBubble(e,i)
                )}

                <div ref={divRef}></div>
            </div>


            <form onSubmit={submit}>
                <label htmlFor="" > </label>
                <input  value= {message} onChange = {(e) => setMessage(e.target.value)}  className="chatInput"/>

                <button className="button">Enviar</button>
            </form>
            
        </div>


    );
};

export default Chat