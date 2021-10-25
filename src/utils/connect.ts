import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'
import mongoosePaginate from 'mongoose-paginate-v2'

const connect = async ()=>{
    const dbUri = config.get<string>("dbUri")

    try {
        await mongoose.connect(dbUri)
        logger.info("Connected to MongoDB")
    } catch (e) {
         logger.error("Could not connect to MongoDB")
        process.exit(1)
    }
    mongoose.plugin(mongoosePaginate)
}

export default connect