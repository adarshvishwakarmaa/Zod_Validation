const User = require("../models/adminModel");
const bcrypt = require("bcryptjs");

const home = async (req,res) => {
    try {
        res
       .status(200)
       .send("Welcome to adminRoute controller")
    } catch (error) {
        res
       .status(400)
       .send({msg:"Page not Found controller"})
    }
    
}


// const login = async (req,res) => {
//     try {
//         console.log(req.body);
//         const {username,email,phone,password} = req.body;
//         const userExits =await User.findOne({email});
//         if(userExits){
//            return res.status(400).json({msg:"Email Already Exits"})
//         }
//        const userCreated = await User.create({username,email,phone,password})
//         res.status(200).json({msg:userCreated}) 
       
//     } catch (error) {
//         res
//        .status(500)
//        .json("internal Server Error");
//     }
// }

const register = async (req,res) => {
    try {
        console.log(req.body);
        const {username,email,phone,password} = req.body;
        const userExits =await User.findOne({email});
        if(userExits){
           return res.status(400).json({msg:"Email Already Exits"})
        }

        //hasing password using bcrypt 1.Method
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound);

       // const userCreated = await User.create({username,email,phone,password:hash_password})
       const userCreated = await User.create({username,email,phone,password})
        res.status(201).json({msg:"registration Succesfull", 
            token: await userCreated.generateToken(),
            userId:userCreated._id.toString(),
        }); 
       
    } catch (error) {
        res
       .status(500)
       .json("internal Server Error");
    }
}

const login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const userExit = await User.findOne({email})
        console.log(userExit);
        if(!userExit){
            return res.status(400).json({message:"invalid Crdentail"})
        }
        //1.method to compare email and password
        // const isValid = await bcrypt.compare(password,userExit.password);
        const isValid = await userExit.comparePassword(password);

        if(isValid){
            res.status(200).json({msg:"Login Successfully", 
                token: await userExit.generateToken(),
                userId:userExit._id.toString(),
            }); 
        }else{
            res.send(400).json({message:"Invalid password or email"})
        }

    }catch(error){
       // res.status(500).json({msg:"interal server Error"})
       next(error);
    }
}



module.exports ={home,register,login};