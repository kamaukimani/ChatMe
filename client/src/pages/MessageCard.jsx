import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import NewMessage from "./NewMessage";
function MessageCard({API_URL}){

    const [messages,setMessages] = useState([]);
    const [isMessage,setIsMessage] = useState(false);
    const [bodyMessage,setBodyMessage] = useState("");
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
    //console.log(message);
    //const {body, recipient, updated_at:updatedAt,recipient_id:receiver,sender_id:sender} = message
    // console.log(date);
    // const isDate = date.split(" ")
    // // console.log(isDate)
    // const [,time] = isDate
    //console.log(updatedAt);
   // const formattedDate = updatedAt !=null ? new Date(updatedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) : "";
    
    // function handleAddMessage(e){
    //     e.preventDefault();

    // }
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
            <NewMessage />
        </>
    )
}
export default MessageCard;