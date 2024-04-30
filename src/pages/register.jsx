import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerdata = {
      email: email,
      nickname: nickname,
      password: password,
    };

    console.log(registerdata);

    fetch("https://lockerroom-7dd0015188c2.herokuapp.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(registerdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        window.location.href = "/auth/login";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />

        <label>Nickname:</label>
        <input type="text" value={nickname} onChange={handleNicknameChange} />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
