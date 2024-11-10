import express from 'express';
import Project from '../database/models/project.js';
import mongoose from 'mongoose';
import sourceRouter from './project/source.js';
// import URLParse from "url-parse";

const router = express.Router();

router.use('/source', sourceRouter);

router.get('/setup', async (req, res) => {
    const { _id } = req.user;
    await Project.findOne({ manager: new mongoose.Types.ObjectId(_id) }, { controls: 0, _id: 0 })
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
})


router.get("/details", async (req, res) => {
    const { _id } = req.user;
    // console.log(req.user)
    const response = await Project.findOne({ manager: new mongoose.Types.ObjectId(_id) }, { name: 1, email: 1, source: 1, _id: 0 });
    // console.log(response)
    return res.json(response);
})

router.post("/details", async (req, res) => {
    const { _id } = req.user;
    const { name, email } = req.body;
    await Project.findOneAndUpdate({ manager: new mongoose.Types.ObjectId(_id) }, { $set: { name, email } })
        .then(response => {
            return res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
})




router.get('/controls', async (req, res) => {
    const { _id } = req.user;
    await Project.findOne({ manager: new mongoose.Types.ObjectId(_id) }, { controls: 1, _id: 0 })
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
})


router.post('/controls', async (req, res) => {
    const { _id } = req.user;
    await Project.findOneAndUpdate({ manager: new mongoose.Types.ObjectId(_id) }, { $set: { controls: req.body } })
        .then(response => {
            return res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
})




export default router;