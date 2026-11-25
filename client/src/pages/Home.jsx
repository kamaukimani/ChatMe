import NavBar from '../components/NavBar';
import React, {useState, useEffect} from 'react';
import MessageList from './MessageList';
import Contact from "./Contact";

function Home({user, API_URL, onLogin, onUser}){
    const [search,setSearch] = useState("");
    const [messages,setMessages] = useState([]);
    const [error,setError] = useState("");
    const [isMessages,setIsMessages] = useState(false);
    const [userName,setUserName] = useState("");
    const [userObj,setUserObj] = useState({});
    // console.log(user);
    const {username} = user;

    useEffect( () => {
        setError("");
        fetch(`${API_URL}/messages`,{
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

    // if(!isMessages) return <h1>Loading messages...</h1>
    
    // const messageList = messages.map(message => (
    //     <MessageList key={message.id} msg={message}/>
    // ))
     function handleAddChat(e){
        e.preventDefault();
        fetch(`${API_URL}/user`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            credentials: "include",
            body:JSON.stringify({username:userName})
        })
        .then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    setUserObj(data);
                    setUserName("");

                })
            }
        })

    }

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
            <Contact userName={userName} onSetUserName={setUserName} onAddChat={handleAddChat}/>
            {isMessages ? (
                <>
                    {messages.length > 0 ? (
                        //messages.map(message => (
                        <MessageList 
                            // key={message.id}
                            // msg={message}
                            messageArray={messages}
                            onUser={onUser}
                            search={search}
                            API_URL={API_URL}
                            userObj={userObj}
                        />
                    //))
                    ): (
                        <p>Ooops!...No messages</p>
                    )}
                </>
            ) : (
                <h2>Loading messages...</h2>
            )}
            {/* {messageList.length > 0 ? (
                messageList
                ): (
                    <p>No messages yet</p>
                )
            } */}
                
        
        </main>
    )
}
export default Home;