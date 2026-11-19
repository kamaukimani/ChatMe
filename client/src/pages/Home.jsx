import React, {useState} from 'react';
function Home({user}){
    

    const [search,setSearch] = useState("");
    
    const {id,username,messages} = user;

    const message = messages.map((message,index)=>(
        <li key={index}>{message.body}</li>
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
        
            {
                messages.length > 0 ? (
                    <ol>
                        {message}
                    </ol>
                ) : (
                    <p>No messages yet</p>
                )
            }
            
        </main>
    )
}

export default Home;