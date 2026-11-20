import {Link} from "react-router-dom";
function MessageList({msg}){
    console.log(msg)
    const {username} =msg.contact;
    return (
        <div id="link">
            <Link className="link">{username}</Link>
        </div>
    )
}

export default MessageList;