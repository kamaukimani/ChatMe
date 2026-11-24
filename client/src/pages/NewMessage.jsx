import {useState} from 'react';
import send from "../assets/send.png"
function NewMessage(props){
    const {receiver,onAddMessage,API_URL} = props;
    const [body,setBody] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        fetch(`${API_URL}/messages/user`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                body,
                recipient_id: receiver,
            })
        })
        .then(r => {
            if(r.ok){
                r.json().then(data=> {
                    onAddMessage(data);
                    setBody("");
                })
            }
        })
    }
    const isText = body.length >= 1;
    return(
        <form className="sendForm" onSubmit={handleSubmit}>
            <textarea 
                type="text"
                id="message"
                name="message"
                placeholder="Message"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                autoComplete="false"
            />
            {isText ? (
                <button>{<img src={send} className="imgB" />}</button>
            ) : null}
        </form>
    )
}
export default NewMessage;