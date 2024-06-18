// models/registration.js
import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 3
    },
    verificationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    addedAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;