import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import NewMessage from "./NewMessage";
import EditMessage from "./EditMessage";

function MessageCard({ API_URL, currentUser, userName }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing,setIsEditing] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/messages/${id}`, {
            credentials: "include",
        })
        .then(r => {
            if (r.ok) {
                return r.json();
            }
            throw new Error("Failed to load messages");
        })
        .then(data => {
            setMessages(data);
            setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, []);

    const message = messages.map(msg => {
        const isSentByMe = msg.sender_id === currentUser?.id;
        const updatedAt = new Date(msg.updated_at.replace(" ", "T") + "Z")
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        return (
            <div key={msg.id} className={isSentByMe ? "sent-right" : "received-left"}>
                <ReactMarkdown>{msg.body}</ReactMarkdown>
                <small>
                    <p className="date">{updatedAt}</p>
                </small>
                <div className="span">
                    {isSentByMe ? (
                        <button onClick={() => setIsEditing(msg)} >
                            <span >
                                ✏️
                            </span>
                    </button>
                    ) : null}
                    <button className="delete"
                        onClick={() => deleteMessage(msg.id)}
                        >
                        <span>
                            🗑
                        </span>
                    </button>
                </div>
            </div>
        );
    });

    function handleAddMessage(newMessage) {
        setMessages([...messages, newMessage]);
    }

     function handleDelete(id){
            const updatedMessages= messages.filter(msg => msg.id !== id)
            setMessages(updatedMessages);
        }
    function deleteMessage(id){
        fetch(`${API_URL}/messages/delete/${id}`,{
            method: "DELETE",
            credentials: "include",
        })
        handleDelete(id);
    }
    function handleUpdateMessage(updatedMessageObj){
        const updatedMessages= messages.map(message=>{
            if(message.id === updatedMessageObj.id){
                return updatedMessageObj;
            } else {
                return message;
            }
        })
        setMessages(updatedMessages);
    }
    return (
        <div className="messageCard">
            <div className="username">
                <button
                    style={{ margin: "10px" }}
                    onClick={() => navigate("/")}
                >
                ⬅
                </button>

            
                <h1 >{userName}</h1>
            </div>
            {isEditing ? (
                <EditMessage
                    message={isEditing}
                    onEdit={()=> setIsEditing(null)}
                    onUpdate={handleUpdateMessage}
                    API_URL={API_URL}
                />
            ) : (
                <>
                    <div className="message">
                        {isLoading ? (
                            <p>Loading messages...</p>
                        ) : message.length > 0 ? (
                            message
                        ) : (
                            <p>No messages yet. Say hi!</p>
                        )}
                    </div>

                    <NewMessage receiver={id} onAddMessage={handleAddMessage} API_URL={API_URL} />
                </>
            )}
        </div>
    );
}

export default MessageCard;
