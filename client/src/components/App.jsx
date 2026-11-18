import Signup from './Signup';
import LoginForm from './LoginForm';
import React, {useEffect, useState} from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
function App(){
        const API_URL="http://localhost:5000"

        const [isUser,setIsUser] = useState(null);

        useEffect( () => {
            fetch(`${API_URL}/check_session`,{
                credentials:"include",
            })
            .then( r => {
                if(r.ok){
                    r.json().then(user => setIsUser(user.username))
                }
            })
        },[])
    return(
        <div>
            {isUser ? (
                <h1>Welcome {isUser} to ChatMe application</h1>
            ) : (null)}
            <Login API_URL={API_URL} onLogin={setIsUser}/>
            <Signup API_URL={API_URL}/>
            <LoginForm API_URL={API_URL} onLogin={setIsUser}/>
            <Home />
        </div>
    )
}

export default App;