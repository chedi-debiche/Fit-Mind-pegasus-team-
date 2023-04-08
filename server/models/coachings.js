const mongoose = require('mongoose');

const CoachingSchema = new mongoose.Schema({
  nameCoaching: {
    type: String,
    required: true
  },
   nameCoach: {
     type: String,
     required: true
   },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5
  },
  category: {
    type: String,
    required: true,
    enum: ['sport', 'psychologist']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }
});

CoachingSchema.pre('save', function(next) {
  if (!this.isModified('user')) {
    return next();
  }
  if (!this.user) {
    this.user = this._id;
  }
  next();
});




module.exports = mongoose.model('Coaching', CoachingSchema);