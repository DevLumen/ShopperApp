import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Splash() {
  
<<<<<<< HEAD
=======
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5050/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form})
      });
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }
>>>>>>> 2a3744132d645e5cb45b57204d86126102afd837

  return (
    <div>
      <h1>HELLO WORLD. Register and Login components will go here as modals</h1>
    </div>
  );
}