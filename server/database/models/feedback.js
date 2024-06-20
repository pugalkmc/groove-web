import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    category: {
        type: String,
        enum: ['General', 'Bug Report', 'Feature Request'],
        default: 'General'
    },
    details: {
        type: String,
        required: true,
        minLength: 1
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update 'updatedAt' timestamp before saving
feedbackSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Middleware to update 'updatedAt' timestamp before findOneAndUpdate
feedbackSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Middleware to update 'updatedAt' timestamp before updateOne (Mongoose >= 5.x)
feedbackSchema.pre('updateOne', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;