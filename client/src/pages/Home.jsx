import React, {useState} from 'react';
function Home({user}){

    const [search,setSearch] = useState("");
    if (!user) return <Login API_URL={API_URL} onLogin={setUser}/>;
    return(
        <main className="home">
             {user ? (
                <h1>Welcome {user} to ChatMe application</h1>
            ) : (null)}
            <input 
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search username"
            />
        </main>
    )
}

export default Home;