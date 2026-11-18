import React, {useState} from 'react';
import LoginForm from './LoginForm';
import logo from '../assets/loading.png'

function Signup({API_URL, onLogin}){
        
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirmation,setPasswordConfirmation] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError]=useState("");
    const [isSignup,setIsSignup] = useState(false);

    const isMatch = 
        password.length > 0 &&
        password === passwordConfirmation;

    function handleSubmit(e){
        e.preventDefault();
        if(!isMatch){
            setIsError("passwords do not match!")
            return;
        }
        setIsError("")
        setIsLoading(true);
        fetch(`${API_URL}/signup`,{
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                password_confirmation:passwordConfirmation,
            })
        })
        .then( r => {
            setIsLoading(false)
            
            if (r.ok){
                
                r.json().then(() =>{
                    setIsSignup(true);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setPasswordConfirmation("");
                    setIsLoading(false);
                    setIsError("");
                })
            } else{
                r.json().then(data => {
                  
                    setIsLoading(false);
                    setIsError(data.error);
                })
    }
        })
        .catch(err => {
            // console.log(err)
            setIsError("Check your Network connection")
        })
    }
   
    if (isLoading) return(
            <div className="logo">
                <img src={logo} alt="Loading..." />
            </div>
        )
    return(
        <>
        {isSignup ? (
                <LoginForm API_URL={API_URL} onLogin={onLogin}/>
            ) : (
                    <div className="signupDiv">
                        <form onSubmit={handleSubmit} className="signup">
                            <label htmlFor="username">UserName:</label>
                            <input 
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            <label htmlFor="password">Enter Password:</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <label htmlFor="passwordConfirmation">Password Confirmation</label>
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                placeholder="Password Confirmation"
                                required 
                            />
                            {passwordConfirmation.length > 0 && !isMatch && (
                                <p>Passwords do not Match!!</p>
                            )}
                            {isError && <p style={{color:"red"}}>{isError}</p>}
                            <button type="submit" disabled={!isMatch}>Sign Up</button>
                        </form>
                    </div>
                )
        }
        </>
    )

}

export default Signup;