import { Pinecone } from '@pinecone-database/pinecone'
import { PINECONE_API_KEY } from '../config.js'
import Source from './models/source.js'
import mongoose from 'mongoose'

const pc = new Pinecone({ apiKey: PINECONE_API_KEY })
const index = pc.index("common")


async function deleteWithTag(tag, manager, index) {
    try {
        const ns = index.namespace(manager)
        const data = await  Source.findOne({ _id: tag }, {chunkLength: 1 });
        const chunkLength = data.chunkLength;
        if (chunkLength > 0) {
            var ids = [];
            for (var index=1; index<=chunkLength; index++){
                ids.push(`${tag}_${index}`)
            }
            await ns.deleteMany(ids);
            console.log(`Deleted ${ids.length} documents with tag '${tag}'.`);
            return true
        } else {
            console.log(`No documents found with tag '${tag}'.`);
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

export {
    index,
    deleteWithTag
}