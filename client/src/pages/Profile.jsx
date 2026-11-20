import { useNavigate } from "react-router-dom";

function Profile({user}){

    const navigate = useNavigate();    
    const {email,username} = user;
    // console.log(email);
    // console.log(username);
    return(
        <main>
            
            <div className="profile">
                <button className="back" onClick={()=>navigate("/")}>Back</button>
                <h2>{username}</h2>
                <p className="p">
                    <span>Username:</span>
                    <button className="button">{username}</button>
                </p>
                
                <p>
                    <span>Email:</span>
                    <button className="button">{email}</button>
                </p>
                <button className="btn">Support</button>
            </div>
        </main>
    )

}

export default Profile;