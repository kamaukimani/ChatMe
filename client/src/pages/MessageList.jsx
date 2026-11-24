import {Link} from "react-router-dom";
function MessageList({msg}){
    //console.log(msg)
    const {id,recipient} =msg;
    //console.log(id)
    return (
        <div id="link">
            <Link className="link" to={`/messages/${id}`}>{recipient.username}</Link>
            {/* <p>Hello there</p> */}
        </div>
    )
}

export default MessageList;