import {user} from "../models/users.js";
import db from "../db/connection.js";

const login = async (req, res, next) => {
    const {email, password} = JSON.parse(req.body.body);
    console.log(email, password);
    const findUser = await user.find({email: email});
    console.log(findUser);
    if(findUser.password === password) console.log("Success, you are logged in");
    else console.log("That password is incorrect.");
    return
};

const register = async (req, res, next) => {
    let parsed = JSON.parse(req.body.body);
    
    try{
        let newUser = {
            username: parsed.username,
            email: parsed.email,
            password: parsed.password
        }
        let userCollection = db.collection("users");
        let result = await userCollection.insertOne(newUser);
        res.send(result).status(200);
        return
    }catch(e){
        res.json("Failed " + e);
        
    }

}

export{login, register}