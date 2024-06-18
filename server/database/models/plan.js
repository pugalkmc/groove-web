// models/plans.js
import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    addedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update 'updatedAt' timestamp before saving
planSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Middleware to update 'updatedAt' timestamp before findOneAndUpdate
planSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Middleware to update 'updatedAt' timestamp before updateOne (Mongoose >= 5.x)
planSchema.pre('updateOne', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});


const Plan = mongoose.model('Plan', planSchema);

export default Plan;