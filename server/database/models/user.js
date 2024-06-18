// models/users.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 1
    },
    payments: [
        {
            planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
            date: { type: Date, default: Date.now },
            paymentDetails: {
                type: {
                    type: String,
                    required: true
                },
                cardNo: {
                    type: Number,
                    required: true,
                    min: 1000000000000000,
                    max: 9999999999999999
                },
                holderName: {
                    type: String,
                    required: true,
                    minLength: 1
                }
            },
            status: { type: String, enum: ['success', 'failed', 'pending', 'cancelled'] , required: true}
        }
    ],
    addedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update 'updatedAt' timestamp before saving
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Middleware to update 'updatedAt' timestamp before findOneAndUpdate
userSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Middleware to update 'updatedAt' timestamp before updateOne (Mongoose >= 5.x)
userSchema.pre('updateOne', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

const User = mongoose.model('User', userSchema);

export default User;