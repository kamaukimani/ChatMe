import Signup from './Signup'

function App(){

    const API_URL="http://localhost:5000"
    return(
        <div>
            <h1>Welcome to ChatMe application</h1>
            <Signup API_URL={API_URL}/>
        </div>
    )
}

export default App;