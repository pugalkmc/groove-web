import express from 'express'
import multer from "multer";
import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { deleteWithTag, index } from "../../database/pinecone_config.js"
import mongoose from "mongoose";
import axios from "axios";
import { WORKER_URL } from '../../config.js';
import Source from '../../database/models/source.js';
import { fileURLToPath } from 'url';
import fs from 'fs'

const router = express.Router()

// Helper function to get __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/file', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const fileBuffer = req.file.buffer; // Buffer containing the file data

        // Example: Process file or save it with a dynamic name like temp_${_id}.pdf
        const _id = req.user._id; // Assuming _id is sent from the frontend
        const fileName = `temp_${_id}.pdf`;

        // Optionally, save the file to disk if needed
        const filePath = path.join(__dirname, 'uploads', fileName);
        fs.writeFileSync(filePath, fileBuffer);
        const loader = new PDFLoader(filePath);
        const docs = await loader.load();
        fs.unlinkSync(filePath);

        const formatted = docs.map(doc => doc.pageContent)
        // Create and save new source
        const newSource = new Source({
            manager: new mongoose.Types.ObjectId(_id),
            type: 'file',
            tag: fileName,
            values: formatted,
            isScraped: false,
            isStoredAtVectorDb: false,
        });
        await newSource.save();

        // Trigger the Python backend worker
        // const pythonBackendUrl = `${WORKER_URL}/source/text/${newSource._id}`; // Replace with your actual Python backend URL
        // axios.post(pythonBackendUrl, { link: tag });

        res.status(200).send('File uploaded successfully.');

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file.');
    }
});

// API route to get all sources for the logged-in user
router.get("/", async (req, res) => {
    const { _id } = req.user;
    try {
        const sources = await Source.find({ manager: new mongoose.Types.ObjectId(_id) }, { "tag": 1, "values.0": 1, type: 1 });
        return res.status(200).json(sources);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to add new link and trigger Python backend
router.post("/link", async (req, res) => {
    const { _id } = req.user;
    const { tag, value } = req.body;

    try {
        // Create and save new source
        const newSource = new Source({
            manager: new mongoose.Types.ObjectId(_id),
            type: 'link',
            tag,
            values: [],
            isScraped: false,
            isStoredAtVectorDb: false,
        });
        await newSource.save();

        // Trigger the Python backend worker
        const pythonBackendUrl = `${WORKER_URL}/source/link/${newSource._id}`; // Replace with your actual Python backend URL
        axios.post(pythonBackendUrl, { link: tag });

        return res.status(200).json(newSource);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to delete a link source
router.delete("/link/:id", async (req, res) => {
    const { _id: manager } = req.user;
    const { id } = req.params;

    try {
        const sources = await Source.findOne({ _id: new mongoose.Types.ObjectId(id) }, { isScraped: 1, isStoredAtVectorDb: 1 });
        if ( !sources.isStoredAtVectorDb) {
            return res.status(500).json({ error: "Can't delete now, this source is under progress, please come later and remove if needed" });
        }
        const status = await deleteWithTag(id, manager, index);
        if (!status) {
            return res.status(500).json({ error: "Can't delete now, this source is under progress, please come later and remove if needed" });
        }

        await Source.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id), type: 'link' });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});

// API route to add a text source
router.post("/text", async (req, res) => {
    const { _id } = req.user;
    const { tag, value } = req.body;

    try {
        const newSource = new Source({
            manager: new mongoose.Types.ObjectId(_id),
            type: 'text',
            tag,
            values: [value],
            isScraped: false,
            isStoredAtVectorDb: false,
        });
        await newSource.save();
        return res.status(200).json(newSource);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to delete a text source
router.delete("/text/:id", async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    try {
        await Source.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id), manager: new mongoose.Types.ObjectId(_id), type: 'text' });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to update a text source
router.put("/text/:id", async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const { value } = req.body;

    try {
        await Source.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id), manager: new mongoose.Types.ObjectId(_id), type: 'text' },
            { $set: { 'values.0.text': value, updatedAt: new Date() } }
        );
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;