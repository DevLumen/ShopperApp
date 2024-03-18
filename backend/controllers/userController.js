import { user } from "../models/users.js";


const login = async (req, res, next) => {
    const {email, password} = req.body;

    const findUser = await user.findOne({email: email});
    if(findUser.password === password) res.json("Success, you are logged in");
    else res.json("That password is incorrect.");

};

const register = async (req, res, next) => {
    try{
        const newUser = await user.create(req.body);
        console.log("hi----------======----")
        res.json("Successfully added new user" + newUser.name);

    }catch(e){
        res.json("Failed " + e);
    }

}

export{login, register}