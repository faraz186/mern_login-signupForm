const userModel = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");

const SignupController = async (req,res)=>{
    try {
        const {first_name,last_name,email,password} = req.body;
        
        if(!first_name || !last_name || !email || !password){
            res.status(400).json({
                message:"fields still missing.."
            })
            return
        }
        
        let emailExist = await userModel.findOne({email});
        
        if(emailExist !== null){
            res.json({
                message:'email already exist..',
                data:null,
                status:false
            })
            return
        }
        else{
            const hashPassword = await bcrypt.hash(password,10);
            console.log("hashPassword",hashPassword)
            
            let obj = {
                    first_name,last_name,email,password:hashPassword
                }
                
                const createuser = await userModel.create(obj)
                
                res.status(200).json({
                    message:"user created successfully..",
                    data:createuser,
                    status:true
                })
            }
            
        } catch (error) {
        res.status(500).json({
            message:"something went wrong..",
            data:null,
            status:false
        })
    }
}

module.exports = SignupController