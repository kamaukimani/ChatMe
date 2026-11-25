import {useState} from 'react';

function Contact({userName, onSetUserName, onAddChat}){
   
    return(
        <form onSubmit={onAddChat}>
            <input 
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => onSetUserName(e.target.value)}
                    placeholder="Add Contact..."
                />
            <button>Add</button>
        </form>
    )
}

export default Contact;