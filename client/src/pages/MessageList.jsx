import {Link} from "react-router-dom";
import {useState} from 'react';
function MessageList({messageArray,onUser,search, userObj}){
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
    console.log(userObj);
   
    return (
        <div id="link">
            {
                Object.keys(userObj).length > 0 ? (
                    <Link className="link" to={`/messages/${userObj.id}`}
                        onClick={()=> onUser(userObj.username)}
                        >{userObj.username}</Link>
                ) : (
                    users
                )
            }
            
        </div>
    )
}

export default MessageList;