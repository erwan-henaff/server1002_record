const mongoose = require('mongoose');
const {Schema} = mongoose;
const Address = require('./Address');
const jwt = require('jsonwebtoken');
const encryption = require('../lib/encryption');


const UserSchema = new Schema ({
    id: false,
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    userName : {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type : Address,
        required : true
    },
    tokens: [
        {
            _id: false,
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
      ]
},
{
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
}
);

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});


UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'x-auth';

    const token = jwt
        .sign({ _id: user._id.toHexString(), 
            access:access
        }, 'babylon')
        .toString();

    // user.tokens.push({
    //     access:access,
    //     token:token 
    // })
    return token;
} 

UserSchema.methods.checkPassword = async function(password) {
    const user = this;
    console.log(password);
    console.log(user.password);
    // below password is the password from the request and 
    // user.password is the hash from the user document in the database
    return await encryption.compare(password, user.password);
};




UserSchema.methods.getPublicFields = function () {
    return {
        _id: this._id,
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        fullName: this.fullName,
        birthday: new Date(this.birthday),
        address: this.address
    };
};

UserSchema.statics.findByToken = function(token) {
    const User = this;
    let decoded;
  
    try {
      decoded = jwt.verify(token, 'babylon');
    } catch (err) {
      return;
    }
    console.log(decoded);
    return User.findOne({
      _id: decoded.id
    });
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    console.log("22222222222222222")
    console.log(this.password)
    this.password = await encryption.encrypt(this.password);

    console.log(this.password);
    next();


});

module.exports = mongoose.model('User', UserSchema);