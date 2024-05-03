function Home() {
  const handleLogin = () => {
    window.location.href = "/auth/login";
  };

  const handleRegister = () => {
    window.location.href = "/auth/register";
  };

  return (
    <div className="Home">
      <h1>Welcome to the Lockerroom!</h1>
      <p>Where all the gossip starts 🤐.</p>
      <section className="Home-buttons">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </section>
      <a className="Source" href="https://github.com/Eidroy/Chatroom">
        Source Code
      </a>
    </div>
  );
}

export default Home;
