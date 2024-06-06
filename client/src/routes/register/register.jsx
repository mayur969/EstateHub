import "./register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
  
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const {username, email, password} = Object.fromEntries(formData);
    try {

      await apiRequest.post('/auth/register', {username, email, password})
            .then((res)=>{
              if(res.status == 201)  
                navigate("/login");
            })

    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          {error && <span>{error}</span> }
          <button disabled={isLoading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
