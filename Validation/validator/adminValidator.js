const {z} = require("zod");

//Validation : zod is use for validation 
//creating an object Schema

const signupSchema = z.object({
    username:z
       .string({ required_error:"Name is required"})
       .trim()
       .min(3, {message: "name must be at least of 3 chars."})
       .max(255, {message: "name must not be more than 255 characters"}),
    
    email:z
       .string({ required_error:"Email is required"})
       .trim()
       .min(3, {message: "email must be at least of 3 chars."})
       .max(255, {message: "email must not be more than 255 characters"}),
    
    phone:z
       .string({ required_error:"Phone is required"})
       .trim()
       .min(10, {message: "phone must be at least of 3 chars."})
       .max(20, {message: "phone must not be more than 255 characters"}),

    password:z
       .string({ required_error:"Password is required"})
       .trim()
       .min(7, {message: "password must be at least of 3 chars."})
       .max(1000, {message: "password must not be more than 255 characters"}),
    }
)

module.exports = signupSchema;