import {Link} from "react-router-dom";
import {useState} from 'react';
function MessageList({messageArray,onUser,search}){
    const displayedUsers= messageArray.filter(message => {
        return message.username.toLowerCase().includes(search.toLowerCase())
    }
    )
    const users=displayedUsers.map(user => (
                <div key={user.id}>
                    <Link className="link" to={`/messages/${user.id}`}
                    
                    onClick={()=> onUser(user.username)}
                    >{user.username}</Link>
                </div>
            ))
    return (
        <div id="link">
            {users}
            {/* <p>Hello there</p> */}
        </div>
    )
}

export default MessageList;