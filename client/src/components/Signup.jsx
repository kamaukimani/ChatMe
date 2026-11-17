import React, {useState} from 'react';

function Signup(){
    const initialFormData = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };
        
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirmation,setPasswordConfirmation] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError]=useState(false);

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
        fetch("backendUrl",{
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
            if (r.ok){
                r.json().then(() =>{
                    setFormData(initialFormData);
                    setIsLoading(false);
                    setIsError(false);
                })
            } else{
                r.json().then(error =>{
                    setIsLoading(false);
                    setIsError(error)
                })
            }
        })
    }
    // function handleChange(e){
    //     const name = e.target.name;
    //     const value = e.target.value;

    //     setFormData({
    //         ...formData,
    //         [name]:value,
    //     })

    // }

    return(
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
                />
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Enter Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <lable htmlFor="passwordConfirmation">Password Confirmation</lable>
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Password Confirmation"
                />
                {passwordConfirmation > 0 && !isMatch && (
                    <p>Passwords do not Match!!</p>
                )}
                {isError && <p >{isError}</p>}
                <button type="submit" disabled={!isMatch}>Sign Up</button>
            </form>
        </div>
    )

}

export default Signup;