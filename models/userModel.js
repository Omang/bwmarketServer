const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: true
    },
    lastname:{type: String, required:true},
    mobile: {type:Number, required:true,  unique: true, trim: true},
    occupation: {type: String, required: true},
    isBlocked:{type:Boolean, default: false},
    role: {type: String,
          default: 'business' }

}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model('User', userSchema);
