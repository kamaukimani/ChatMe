import {useState} from 'react';

function Contact(){
    const [username,setUsername] = useState("");
    return(
        <form>
            <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Add Contact..."
                />
            <button>Add</button>
        </form>
    )
}

export default Contact;