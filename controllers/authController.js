const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const { generateToken } = require('../config/jwtToken');
const {validateMongodbId} = require('../utils/validateMongoId');
const  {generateRefreshToken} = require('../config/refreshToken');




const registerOwner = asyncHandler(async(req, res)=>{
  
    const {firstname, lastname, 
        mobile, password, role} = req.body;

        try {

           const superuser = await User.create({firstname, lastname, 
                mobile,
                password, role});

           if (superuser) {
            res.json(superuser).status(200);
           } else {
            res.json({message:'Something wrong bad happend'}).status(500);
           }
           
            
        } catch (error) {

            throw new Error(error);
            
        }

});
const registerVisitor = asyncHandler(async(req, res)=>{
    const {firstname, lastname, mobile, password} = req.body;

    try{

        const addone = await User.create(req.body);
        if (addone) {
            res.json(addone).status(200);
        } else {
            res.json({message: 'Something wrong bad happend'});
        }

    }catch(e){
     throw new Error(e);
    }
})
const loginUser = asyncHandler(async(req, res)=>{

    const {email, password} = req.body;
console.log(req.body);

    try {
        const findone = await User.findOne({email:email});
        if(findone && await findone.isPasswordMatched(password))
    {
      const refreshtoken = await generateRefreshToken(findone?._id);
      const updateuser = await User.findByIdAndUpdate(
        findone._id,{
        refreshToken: refreshtoken
      },{
        new: true
      });
      res.cookie("refreshToken", refreshtoken,{
        sameSite:'None',
        secure: true,
        maxAge: 72*60*60*1000,
        httpOnly: true,
      });
      res.json({
        _id: findone?._id,
        firstname: findone?.firstname,
        lastname: findone?.lastname,
        mobile: findone?.mobile,
        role: findone?.role,
        isBlocked: findone?.isBlocked,
        refreshToken: generateToken(findone?._id)
      });     

    }else{
        throw new Error("Invalid Credentials");
    }
    } catch (error) {
        throw new Error(error);
    }
    


});

const logout = asyncHandler(async(req, res)=>{

    const {refreshToken} = req.body;
    //console.log(req.cookies);
    if(!refreshToken) throw new Error("No refresh Token in cookies");
    
    const user = await User.findOne({refreshToken}); 
    if(!user){
      
      return res.status(204) //forbidden
    }else{
      await User.findOneAndUpdate(refreshToken, {
      refreshToken: ""
    });
   
     res.status(204).json({logout: "logged out"}); //forbidden
    }  
    
      
   });
  
   const updateUser = asyncHandler(async(req, res)=>{
        const {_id} = req.user;
        validateMongodbId(_id);
        try {
          const updateuser = await User.findByIdAndUpdate(_id, {
              firstname: req?.body?.firstname,
              lastname: req?.body?.lastname,
              mobile: req?.body?.mobile
          }, {
            new: true
          });
          res.json(updateuser);
        } catch (error) {
  
          throw new Error(error);
          
        }
   });
 const updatePassword = asyncHandler(async(req, res)=>{
    const {_id} = req.user;
    const {password} = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if(password){
      user.password = password;
      const updatedpassword = await user.save();
      res.json(updatedpassword);
    }else{
      res.json(user);
    }
});

const blockUser = asyncHandler(async(req, res)=>{

 const {id} = req.params;
 validateMongodbId(id);
 try {
   const block = await User.findByIdAndUpdate(id, {
     isBlocked: true,
   },{
     new: true
   });
   res.json({message:"User Blocked"});
 } catch (error) {
   throw new Error(error);
   
 }

});

const unblockUser = asyncHandler(async(req, res)=>{

 const {id} = req.params;
 validateMongodbId(id);
 try {
   const unblock = await User.findByIdAndUpdate(id, {
     isBlocked: false,
   },{
     new: true
   });
   res.json({message:"User unBlocked"});
   
 } catch (error) {
   throw new Error(error);
   
 }
 
});
const getallUser = asyncHandler(async(req, res)=>{
    try {

      const getUsers = await User.find();
      res.json(getUsers);  
        
    } catch (error) {
      
        throw new Error(error);
    }
 });

  


module.exports = {registerOwner, registerVisitor, loginUser, 
                  updateUser, logout, updatePassword, blockUser, unblockUser, getallUser};