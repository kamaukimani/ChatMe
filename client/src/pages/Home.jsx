import NavBar from '../components/NavBar';
import React, {useState, useEffect} from 'react';

function Home({user, API_URL, onLogin}){
    const [search,setSearch] = useState("");
    console.log(user);
    const {username} = user;

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
        </main>
    )
}
export default Home;