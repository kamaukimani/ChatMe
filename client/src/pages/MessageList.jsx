import {Link} from "react-router-dom";
import {useState} from 'react';
function MessageList({messageArray,onUser}){
    //console.log(msg)


    //const {id,username} =msg;
    //console.log(id)
    //console.log(messageArray)
    const users=messageArray.map(user => (
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