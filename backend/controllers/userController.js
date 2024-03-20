import { user } from "../models/users.js";
import db from "../db/connection.js";

const login = async (req, res, next) => {
    const {email, password} = req.body.body;
    const findUser = await user.findOne({email: email});
    console.log(findUser.password);
    if(findUser.password === password) res.json("Success, you are logged in");
    else res.json("That password is incorrect.");

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