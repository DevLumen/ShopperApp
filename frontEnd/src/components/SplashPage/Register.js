import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
    const navigate = useNavigate();

  const handleChange = (value) => {
    return setForm((prev) => {
      return {...prev, ...value}
    })
  }


  const registerUser = async (e) => {
    e.preventDefault();
    try{
      console.log(form)
      await axios.post("http://localhost:5050/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form})
      });
      // console.log(newUser)
      navigate("/home")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <form action="/register" method="post">
        <label for="username">Username:</label>  
        <input 
        id="username" 
        type="text" 
        name="username" 
        placeholder="Username" 
        required
        value={form.username}
        onChange={(e) => handleChange({username: e.target.value})}
        />

        <label for="email">Email:</label>  
        <input 
        id="email" 
        type="text" 
        name="email" 
        placeholder="Email" 
        required
        value={form.email}
        onChange={(e) => handleChange({email : e.target.value})}
        />

        <label for="password">Password:</label> 
        <input 
        id="password" 
        type="password" 
        name="password" 
        placeholder="Password" 
        required
        value={form.password}
        onChange={(e) => handleChange({password: e.target.value})}
        />
        <button type="submit" value="login" onClick={registerUser}>Submit</button>
      </form>
    </div>
  );
}