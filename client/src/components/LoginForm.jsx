import React, {useState} from 'react';
import logo from '../assets/loading.png'

function LoginForm({onLogin, API_URL}){
    const initialFormData={
        email:"",
        password:"",
    };
    const [formData,setFormData] = useState(initialFormData);
    const [error,setError] = useState("");
    const [isLoading,setIsloading] = useState(false);
    

    const isPassword = formData.password.length > 0;

    function handleSubmit(e){
        e.preventDefault()
        setError("");
        setIsloading(true);
        fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        .then(r => {
            setIsloading(false);
            if(r.ok) {
                r.json().then(data => {
                    onLogin(data.username);
                    setFormData(initialFormData);
                    setError("");
                })
            } else {
                r.json().then(data => {
                    setError(data.error);
                })
            }
        })
        .catch(err => {
            setError("Check your Network connectivity");
        })
    }

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    if (isLoading) return(
        <div className="logo">
            <img src={logo} alt="Loading..." />
        </div>
    )

    return (

        <div className="signupDiv">
             <form onSubmit={handleSubmit} className="signup">
                <h3>Log In</h3>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {error && <p style={{color:"red"}}>{error}</p>}
                <button type="submit" disabled={!isPassword}>Login</button>
            </form>
        </div>
    
    )
}
export default LoginForm;