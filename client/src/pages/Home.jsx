import React, {useState, useEffect} from 'react';
import MessageList from './MessageList';
import NavBar from '../components/NavBar';
function Home({user, API_URL, onLogin}){
    

    const [search,setSearch] = useState("");
    // const [isMessage,setIsMessage] = useState(false);
    // const [messages,setMessages] = useState([]);
    console.log(user);
    const {id,username,messages} = user;
    // console.log(user.messages);
    
    // useEffect( () => {
    
    //     setIsMessage(false);
    //     fetch(`${API_URL}/messages/user/${id}`,{
    //         //credentials: "include",
    //     })
    //     .then( r => r.json())
    //     .then(data =>{
    //         setMessages(data);
    //         setIsMessage(true);
    //     })
    // },[])

    const messageList = messages.map((message)=>(
        <MessageList key={message.id} msg={message} />
    ))
    // console.log("message",messageList);
    
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
        
            {/* {isMessage ? (
                <>
                    {messages.length > 0 ? (
                        <ol>
                            {messageList}
                        </ol>
                    ) : (
                        <p>Oops!...No messages yet</p>
                    )}
                </>
            ):(
                <p>Loading messages...</p>
            )} */}
            
                {
                    messages.length > 0 ? (

                        <div>{messageList}</div>
                        
                    ) : (
                        <p>No messages yet</p>
                    )
                }
            
            
        </main>
    )
}

export default Home;