import send from "../assets/send.png"
import {useState} from 'react';
function EditMessage(props){
    const {onEdit,message,onUpdate,API_URL} = props;
    const [body,setBody] = useState(message.body)
    //console.log(message);

    const isText = body.length >=1 ;
    function handleSubmit(e){
        e.preventDefault();
        fetch(`${API_URL}/messages/delete/${message.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            credentials: "include",
            body:JSON.stringify({body})
        })
        .then( r => r.json())
        .then( data => {
            onUpdate(data);
            onEdit();

        })
    }
    return(
        <div>
            <button onClick={onEdit} className="editbtn">Cancel</button>
            <form onSubmit={handleSubmit} className="textarea">
                <textarea 
                    type="text"
                    name="body"
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                    rows={3}
                />
                
                {isText ? (
                    <button>{<img src={send} className="imgT" />}</button>
                ) : null}
                
                {/* <button onClick={onEdit}>Cancel</button> */}
            </form>
        </div>
    )
}
export default EditMessage;