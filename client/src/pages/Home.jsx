function Home({user}){

    if (!user) return <Login API_URL={API_URL} onLogin={setUser}/>;
    return(
        <main className="home">
             {user ? (
                <h1>Welcome {user} to ChatMe application</h1>
            ) : (null)}
            
        </main>
    )
}

export default Home;