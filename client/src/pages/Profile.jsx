function Profile({user}){

    
    const {email,username} = user;
    console.log(email);
    console.log(username);
    return(
        <div className="profile">
            <h2>{username}</h2>
            <p className="p">
                Username:&nbsp;
                <button>{username}</button>
            </p>
            
            <p>
                Email:&nbsp;
                <button>{email}</button>
            </p>
        </div>
    )
}

export default Profile;