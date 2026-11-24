import Profile from "../pages/Profile";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
function NavBar(props){

    const {API_URL,onLogin}=props;
    const navigate = useNavigate()
    // const [showProfile,setShowProfile] = useState(true);

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
    // function handleProfile(){
    //     if(showProfile){
    //         // console.log(showProfile)
    //         setShowProfile(false);
    //         return navigate("/profile")
    //     } else {
    //         // console.log(showProfile);
    //         setShowProfile(true)
    //         return navigate("/");
    //     }
    // }
    // const isProfile = showProfile ? "\u2261" : "\u22d8";
    return (
        <div className="logout">
            <button onClick={()=> navigate("/profile")}>{`\u2261`}</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default  NavBar;