import {useState} from 'react';

function Contact({userName, onSetUserName, onAddChat, error}){
   
    return(
        <form onSubmit={onAddChat}
            // style={{display:"flex",flexDirection:"row",gap:"10px",margin:"2px",justifyContent:"center"}}
        >
            <input 
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => onSetUserName(e.target.value)}
                    placeholder="Add Contact..."
                    style={{height:"27px",borderRadius:"10px",margin:"5px"}}
                />
            <button
                style={{borderRadius:"10px",height:"27px"}}
                >
                    Add
                </button>
            {error && <p style={{color:"red",height:"27px",margin:"10px"}}>{error}</p>}
        </form>
    )
}

export default Contact;