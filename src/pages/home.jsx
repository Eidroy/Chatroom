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
    </div>
  );
}

export default Home;
