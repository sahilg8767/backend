import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            required:true
        },
        coverImage:{
            type:String, //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        refreshToken:{
            type:String
        }
    },{timestamps:true})


    //password encrypt logic
    userSchema.pre("save", async function(next){
        //agr password modified nhi hua toh return next
        if(!this.isModified("password")) {return next()};
    
        //agr password modify hua toh encrypt/ hash kro
        this.password= bcrypt.hash(this.password, 10)
        next()


        //we can also write it as
        /*
         if(this.isModified("password")) {
         this.password= bcrypt.hash(this.password, 10)
        next()};

        otherwise this ->
        next()
        */ 
    })
        userSchema.methods.isPasswordCorrect=async function(password)
        {
           return await bcrypt.compare(password, this.password)
           //it returns true and false for comparison
        }
        userSchema.methods.generateAccessToken= function(){
           return jwt.sign(
                {
                    _id:this.id,
                    email:this.email,
                    username:this.username,
                    fullname:this.fullname,
                },

                process.env.ACCESS_TOKEN_SECRET,

                {
                    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
                }
            )
        }

        userSchema.methods.generateRefreshToken= function(){
             return jwt.sign(
                {
                    _id:this.id,
                },
                
                process.env.REFRESH_TOKEN_SECRET,

                {
                    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
                }
            )
        }
export const User=mongoose.model("User", userSchema)