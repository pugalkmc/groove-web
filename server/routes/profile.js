import express from 'express';
import User from '../database/models/user.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get("/", async (req, res) => {
    const { _id } = req.user;
    await User.findById({ _id: new mongoose.Types.ObjectId(_id) }, { name: 1, email: 1, _id: 0 })
        .then(response => {
            if (response) {
                return res.status(200).json(response);
            }
            return res.sendStatus(401);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
})


router.post("/", async (req, res) => {
    const { _id } = req.user;
    const { name, email } = req.body;
    await User.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, { $set: { name, email } })
        .then(response => {
            return res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
})

export default router;