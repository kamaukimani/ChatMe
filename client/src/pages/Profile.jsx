function Profile({user}){

    
    const {email,username} = user;
    // console.log(email);
    // console.log(username);
    return(
        <div className="profile">
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
    )
}

export default Profile;