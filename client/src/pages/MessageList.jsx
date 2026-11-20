import {Link} from "react-router-dom";
function MessageList({msg}){
    //console.log(msg)
    const {id,contact} =msg;
    return (
        <div id="link">
            <Link className="link" to={`/messages/${id}`}>{contact.username}</Link>
        </div>
    )
}

export default MessageList;