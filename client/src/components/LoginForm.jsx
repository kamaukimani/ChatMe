import React, {useState} from 'react';

function LoginForm({onLogin, API_URL}){
    const initialFormData={
        email:"",
        password:"",
    };
    const [formData,setFormData] = useState(initialFormData);
    const [error,setError] = useState("");

    const isPassword = formData.password.length > 0;

    function handleSubmit(e){
        e.preventDefault()
        setError("");
        fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        .then(r => {
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
            setError(err);
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


    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                {error && <p>{error}</p>}
                <button type="submit" disabled={!isPassword}>Login</button>
            </form>
        </div>
    )
}
export default LoginForm;