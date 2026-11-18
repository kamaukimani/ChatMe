function NavBar(props){

    const {API_URL,onLogin}=props;

    function handleLogout(){
        fetch(`${API_URL}/logout`,{
            method: "DELETE",
            credentials: "include",
            })
        .then(r => {
            if (r.ok){
                onLogin(null);
            }
        })
    }
    return (
        <div className="logout">
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default  NavBar;