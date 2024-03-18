import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username.'],
        maxlength: [40, 'A username cannot exceed 40 characters'],
        minlength: [3, 'A username cannot be less than 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        unique: [true, 'That email is already in use.'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        maxlength: [40, 'A users password cannot exceed 40 characters'],
        minlength: [8, 'A users password cannot be less than 8 characters'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            //This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match, please confirm password."
        }
    }
});

// Export Model
User.plugin(passportLocalMongoose);

const user = mongoose.model('user', User);
export {user}; 