import React, {useState, useEffect} from 'react';
function Home({user, API_URL}){
    

    const [search,setSearch] = useState("");
    const [isMessage,setIsMessage] = useState(false);
    const [messages,setMessages] = useState([]);

    const {id,username} = user;
    
    useEffect( () => {
    
        setIsMessage(false);
        fetch(`${API_URL}/messages/${id}`,{
            //credentials: "include",
        })
        .then( r => r.json())
        .then(data =>{
            setMessages(data);
            setIsMessage(true);
        })
    },[])

    const messageList = messages.map((message)=>(
        <li key={message.id}>{message.body}</li>
    ))
    
    return(
        <main className="home">
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
        
            {isMessage ? (
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
            )}
            
        </main>
    )
}

export default Home;