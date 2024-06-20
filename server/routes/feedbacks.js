import express from 'express';
import Feedback from '../database/models/feedback.js';

const router = express.Router();

// @route   GET /api/feedbacks
// @desc    Get all feedbacks
// @access  Public
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   POST /api/feedbacks
// @desc    Create a new feedback
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, category, details } = req.body;

    // Validate request data
    if (!name || !email || !details) {
        return res.status(400).json({ message: 'Please provide name, email, and details' });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            category,
            details
        });

        const savedFeedback = await newFeedback.save();
        res.status(200).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;