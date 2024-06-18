import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
import mongodbConnect from "./database/db.js";
import Project from "./database/models/project.js";
import User from "./database/models/user.js";
import Source from "./database/models/source.js";
import { authMiddleware, attachUserToRequest, errorHandler } from "./public/middleware/auth.js";
import { login, register } from "./public/middleware/authenticator.js";
import mongoose from "mongoose";
import axios from "axios";
import { deleteWithTag, index } from "./database/pinecone_config.js";

// const func = async () => {
//     await deleteWithTag('6671081f0e12d03eda58f738')
// }

// func()

const app = express();

mongodbConnect();
app.use(express.json());
app.use(morgan());

const allowedOrigins = ['http://localhost:3000', 'https://groove-ai-web.vercel.app'];

const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
};

app.use(cors({
    origin: allowedOrigins,
    methods: '*',
    allowedHeaders: '*',
}));

// Register endpoint
app.post('/api/register', register);
app.post('/api/login', login);

app.use(authMiddleware);
app.use(attachUserToRequest);
app.use(errorHandler);

app.post('/api/auth', (req, res) => {
    return res.status(200).json({ message: 'Json web token is valid' })
})

app.get("/healthcheck", (req, res) => {
    return res.json({ status: "success" });
});


app.get("/api/profile", async (req, res) => {
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


app.post("/api/profile", async (req, res) => {
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


app.get("/api/project/details", async (req, res) => {
    const { _id } = req.user;
    // console.log(req.user)
    const response = await Project.findOne({ manager: new mongoose.Types.ObjectId(_id) }, { name: 1, email: 1, source: 1, _id: 0 });
    // console.log(response)
    return res.json(response);
})

app.post("/api/project/details", async (req, res) => {
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




app.get('/api/project/controls', async (req, res) => {
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


app.get('/api/project/setup', async (req, res) => {
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


app.post('/api/project/controls', async (req, res) => {
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

// API route to get all sources for the logged-in user
app.get("/api/project/source", authMiddleware, async (req, res) => {
    const { _id } = req.user;
    try {
        const sources = await Source.find({ manager: _id }, { "tag": 1, "values.0": 1, type: 1 });
        return res.status(200).json(sources);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to add new link and trigger Python backend
app.post("/api/project/source/link", authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const { tag, value } = req.body;

    try {
        // Create and save new source
        const newSource = new Source({
            manager: _id,
            type: 'link',
            tag,
            values: [],
            isScraped: false,
            isStoredAtVectorDb: false,
        });
        await newSource.save();

        // Trigger the Python backend worker
        const pythonBackendUrl = `http://localhost:5000/api/project/source/link/${newSource._id}`; // Replace with your actual Python backend URL
        axios.post(pythonBackendUrl, { link: tag });

        return res.status(200).json(newSource);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to delete a link source
app.delete("/api/project/source/link/:id", authMiddleware, async (req, res) => {
    const { _id: manager } = req.user;
    const { id } = req.params;

    try {
        const sources = await Source.findOne({ _id : id }, { isScraped : 1 });
        if ( sources.isScraped ){
            return res.status(500).json({ error: "Can't delete now, this source is added just now" });
        }
        const status = await deleteWithTag(id, manager, index);
        if (!status){
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        await Source.findOneAndDelete({ _id: id, type: 'link' });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to add a text source
app.post("/api/project/source/text", authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const { tag, value } = req.body;

    try {
        const newSource = new Source({
            manager: _id,
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
app.delete("/api/project/source/text/:id", authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    try {
        await Source.findOneAndDelete({ _id: id, manager: _id, type: 'text' });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to update a text source
app.put("/api/project/source/text/:id", authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const { value } = req.body;

    try {
        await Source.findOneAndUpdate(
            { _id: id, manager: _id, type: 'text' },
            { $set: { 'values.0.text': value, updatedAt: new Date() } }
        );
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Plan Routes
// app.post('/controls', async (req, res) => {
//     try {
//         const { name, price } = req.body;
//         const plan = new Project({ name, price });
//         await plan.save();
//         res.status(201).json(plan);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started, Listening to PORT: ${PORT}`);
});


// export default app;