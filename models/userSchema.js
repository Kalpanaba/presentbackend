 const mongoose = require('mongoose');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  image: {
    type: String
  },
  status:{
   type:String,
   enum:['active', 'inactive'],
   default:'active'

  },
  createdAt: {
    type: String,
    default: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
  },
  updatedAt: {
    type: String,
    default: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('save', function (next) {
  this.updatedAt = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') });
  next();
});

module.exports = mongoose.model('User', userSchema);
