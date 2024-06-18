// models/project.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    // source: {
    //     link: [{ 
    //         id: { type: String, default: uuidv4, required: true },
    //         tag: { type: String, required: true },
    //         isUpdated: { type: Boolean, default: false },
    //         addedAt: { type: Date, default: Date.now },
    //         updatedAt: { type: Date, default: Date.now }
    //     }],
    //     text: [{ 
    //         id: { type: String, default: uuidv4, required: true },
    //         tag: { type: String, required: true },
    //         value: { type: String , required: true },
    //         isUpdated: { type: Boolean, default: false },
    //         addedAt: { type: Date, default: Date.now },
    //         updatedAt: { type: Date, default: Date.now }
    //     }]
    // },
    controls: {
        status: { type: Boolean, default: true },
        rateLimit: { type: Boolean, default: true },
        rateLimitThreshold: { type: Number, default: 10 },
        rateLimitTimeout: { type: Number, default: 10 }, // Corrected property name
        profanityFilter: { type: Boolean, default: true },
        welcomeNewUsers: { type: Boolean, default: true }
    },
    groupId: {
        type: Number,
        default: 0
    },
    registerId: {
        type: String,
        default: uuidv4
    },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update 'updatedAt' timestamp before saving
projectSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Middleware to update 'updatedAt' timestamp before findOneAndUpdate
projectSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Middleware to update 'updatedAt' timestamp before updateOne (Mongoose >= 5.x)
projectSchema.pre('updateOne', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Middleware to update nested arrays' timestamps and isUpdated flag
projectSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.$set && update.$set['source.link']) {
        update.$set['source.link.$[].updatedAt'] = new Date();
        update.$set['source.link.$[].isUpdated'] = true;
    }
    if (update.$set && update.$set['source.text']) {
        update.$set['source.text.$[].updatedAt'] = new Date();
        update.$set['source.text.$[].isUpdated'] = true;
    }
    next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
