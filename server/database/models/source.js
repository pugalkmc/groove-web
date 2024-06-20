import mongoose, { Schema } from "mongoose";

const sourceSchema = new Schema({
    manager: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    },
    type: {
        type: String,
        enum: ['link', 'text','file'],
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    values: {
        type: [String]
    },
    isScraped: {
        type: Boolean,
        required: true
    },
    isStoredAtVectorDb: {
        type: Boolean,
        required: true
    },
    chunkLength : {
        type: Number,
        min: 1
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
sourceSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Middleware to update 'updatedAt' timestamp before findOneAndUpdate
sourceSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Middleware to update 'updatedAt' timestamp before updateOne (Mongoose >= 5.x)
sourceSchema.pre('updateOne', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

const Source = mongoose.model('Source', sourceSchema);

export default Source;
