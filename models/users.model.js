
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
    firstName: String,
    lastName: String,
    name: String,
    nameHb: String,
    facebookId: String,
    password: String,
    userName: String,
    company: String,
    companyUrl: String,
    companyFacebook: String,
    companySite: String,
    privateFacebook: String,
    about: String,
    points: Number,
    description: String,
    email: String,
    birthday: Date,
    gender:String,
    profession: [{ type: String, enum: ['Architect', 'Gardener', 'Landscape Architect', 'Wood Construction', 'Constructor', 'Outdoor Kitchens','Pool Construction', 'Interior Design','Construction Inspector','Other'] }],
    projects: [{type: mongoose.Schema.ObjectId, ref: 'Project'}],
    title: String,
    img: String,
    website: String,
    address: String,
    phone: String,
    officePhone: String,
    role: String,
    status: String,// register,verified
    ARN: String,
    smsCode: String,
    APIToken: String,
    socketId: String,
    os: String
});


userSchema.pre('save', function(next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
}

mongoose.model('User', userSchema);