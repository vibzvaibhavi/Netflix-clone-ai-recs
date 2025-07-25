import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import { toast } from 'react-toastify';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (signState === "Sign In") {
      const res = await login(email, password);
      if (res.success) {
        toast.success("Login successful!");
      } else {
        toast.error(res.error);
        setLoading(false);
      }
    } else {
      const res = await signup(name, email, password);
      if (res.success) {
        toast.success("Signup successful!");
      } else {
        toast.error(res.error);
        setLoading(false);
      }
    }
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} className='login-logo' alt="" />

        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button onClick={user_auth} type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}> Sign Up Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setSignState("Sign In")}> Sign In Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
