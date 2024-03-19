import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  
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

  return (
    <div>
      <form action="/login" method="post">
        <label for="email">Email:</label>  
        <input 
        id="email" 
        type="text" 
        name="email" 
        placeholder="Email Address.." 
        required
        value={form.email}
        onChange={(e) => handleChange({email: e.target.value})}
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
        <button type="submit" value="login">Submit</button>
      </form>
    </div>
  );
}