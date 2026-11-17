import Signup from './Signup';
import LoginForm from './LoginForm';
import React, {useEffect, useState} from 'react';

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

            <Signup API_URL={API_URL}/>
            <LoginForm API_URL={API_URL} onLogin={setIsUser}/>
        </div>
    )
}

export default App;