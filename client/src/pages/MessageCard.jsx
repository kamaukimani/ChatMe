import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown";
function MessageCard({API_URL}){

    const [message,setMessage] = useState({});
    const [isMessage,setIsMessage] = useState(false);
    const [bodyMessage,setBodyMessage] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    //console.log(id);

    useEffect(()=> {
        setIsMessage(false);
        fetch(`${API_URL}/messages/${id}`)
        .then(r =>{
            if(r.ok){
                r.json().then(data =>{
                    //console.log(data);
                    setMessage(data)
                    setIsMessage(true);
                })
            }
        })
    },[])
    if(!isMessage) return <h1>Loading...</h1>
    //console.log(message);
    const {body, recipient, updated_at:updatedAt,recipient_id:receiver,sender_id:sender} = message
    // console.log(date);
    // const isDate = date.split(" ")
    // // console.log(isDate)
    // const [,time] = isDate
    //console.log(updatedAt);
    const formattedDate = updatedAt !=null ? new Date(updatedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) : "";
    
    // function handleAddMessage(e){
    //     e.preventDefault();

    // }

    return(
        <>
            <button onClick={() => navigate("/")}>Back</button>
            <div className="message">
                <h5>{recipient.username}</h5>
                <ReactMarkdown>{body}</ReactMarkdown>
                <small>
                    <p>
                        {formattedDate}
                    </p>
                </small>
            </div>
        </>
    )
}
export default MessageCard;