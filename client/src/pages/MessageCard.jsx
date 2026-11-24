import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import NewMessage from "./NewMessage";
function MessageCard({API_URL}){

    const [messages,setMessages] = useState([]);
    const [isMessage,setIsMessage] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);

    useEffect(()=> {
        setIsMessage(false);
        fetch(`${API_URL}/messages/${id}`,{
            credentials: "include",
        })
        .then(r =>{
            if(r.ok){
                r.json().then(data =>{
                    //console.log(data);
                    setMessages(data)
                    setIsMessage(true);
                })
            }
        })
    },[])
    if(!isMessage) return <h1>Loading...</h1>
    
    const message = messages.map(msg =>{
        //console.log(msg);
        const createdAt= new Date(msg.created_at).toLocaleString([],{hour:"2-digit",minute:"2-digit"})
        return (
            <>
                <h1></h1>
                <div>
                    <ReactMarkdown key={msg.id}>{msg.body}</ReactMarkdown>
                    <small>
                        <p className="date">
                            {createdAt}
                        </p>
                    </small>
                </div>
            </>
        )
    })
    function handleAddMessage(newMessage){
        const updatedMessages= [...messages,newMessage];
        setMessages(updatedMessages);
    }
    return(
        <>
            <button 
                style={{margin:"10px"}}
                onClick={() => navigate("/")}>
                Back
            </button>
            <div className="message">
                {/* <h5>{recipient.username}</h5> */}
                {message}
               
            </div>
            <NewMessage receiver={id} onAddMessage={handleAddMessage} API_URL={API_URL}/>
        </>
    )
}
export default MessageCard;