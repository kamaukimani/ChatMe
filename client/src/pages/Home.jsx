import NavBar from '../components/NavBar';
import React, {useState, useEffect} from 'react';
import MessageList from './MessageList';

function Home({user, API_URL, onLogin}){
    const [search,setSearch] = useState("");
    const [messages,setMessages] = useState([]);
    const [error,setError] = useState("");
    const [isMessages,setIsMessages] = useState(false);
    // console.log(user);
    const {username} = user;

    useEffect( () => {
        setError("");
        fetch(`${API_URL}/messages/user`,{
            credentials: "include",
        })
        .then(r => {
            
            if(r.ok){
                r.json().then(data => {
                    //console.log(data);

                    setMessages(data);
                    setIsMessages(true);
                    setError("");
                })
            } else {
                setIsMessages(false);
                setError("Failed to fetch messages...")
            }
        })
    },[]);

    if(!isMessages) return <h1>Loading messages...</h1>
    
    const messageList = messages.map(message => (
        <MessageList key={message.id} msg={message}/>
    ))

    return(
        <main className="home">
            <NavBar API_URL={API_URL} onLogin={onLogin}/>
            {user ? (
                <h1>Welcome {username} to ChatMe application</h1>
            ) : (null)}
            <input 
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search username"
            />
            {messageList.length > 0 ? (
                messageList
                ): (
                    <p>No messages yet</p>
                )
            }
                
        
        </main>
    )
}
export default Home;