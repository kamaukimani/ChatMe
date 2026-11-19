import React, {useState} from 'react';
function Home({user}){
    
    const {id,username,messages} = user;
    console.log(messages);

    const [search,setSearch] = useState("");

    const message = messages.map((message,index)=>(
        <li key={index}>{message.body}</li>
    ))
    if (!user) return <Login API_URL={API_URL} onLogin={setUser}/>;
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
            <ol>
                {message}
            </ol>
        </main>
    )
}

export default Home;