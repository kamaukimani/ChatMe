
import React, {useEffect, useState} from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
function App(){
        const API_URL="http://localhost:5000"

        const [user,setUser] = useState(null);

        useEffect( () => {
            fetch(`${API_URL}/check_session`,{
                credentials:"include",
            })
            .then( r => {
                if(r.ok){
                    r.json().then(user => setUser(user))
                }
            })
        },[])

        if (!user) return <Login API_URL={API_URL} onLogin={setUser}/>;
    return(
        <main>
            <NavBar API_URL={API_URL} onLogin={setUser}/>
            <Routes>
                <Route 
                    path="/"
                    element={<Home user={user} API_URL={API_URL}/>}
                />
            </Routes>
        
        </main>
    )
}

export default App;