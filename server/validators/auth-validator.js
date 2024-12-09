const {z} = require("zod");

const signupSchema = z.object({

    username : z
    .string({ required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be atleast of 3 chars."})
    .max(255, {message: "Name must not be more than 255 characters"}),

    email : z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters"})
    .max(255, {message: "Email must not be more than 255 characters"}),

    phone : z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone number must be minimum 10 characters"})
    .max(20, {message: "Phone number must be maximum 20 characters"}),

    password : z
    .string({required_error: "Password is required"})
    .trim()
    .min(6, {message: "password must be of atleast 6 characters"})
    .max(1024, {message: "password must be of atmost 1024 characters"})
});

module.exports = signupSchema;