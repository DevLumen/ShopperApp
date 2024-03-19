import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  
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

  
  // Log in a user using email and password
  const logIn = () => {
    fetch('http://localhost:5050/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          localStorage.setItem('user', JSON.stringify({ ...form, token: r.token }))
          props.setLoggedIn(true)
          props.setEmail(form.email)
          navigate('/')
        } else {
          window.alert('Wrong email or password')
        }
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
        <button type="submit" value="login" onClick={logIn}>Submit</button>
      </form>
    </div>
  );
}