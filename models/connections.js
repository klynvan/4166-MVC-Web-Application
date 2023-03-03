const mongoose = require('mongoose');
const { title } = require('process');
const Schema = mongoose.Schema;

const connectionSchema = new Schema(
    {
        title: { type: String, required: [true, 'title is required'] },
        connectiontopic: { type: String, required: [true, 'topic is required'] },
        details: {
            type: String, required: [true, 'details is required'],
            minLength: [10, 'the details should have atleast 10 characters']
        },
        date: { type: String, required: [true, 'date is required'] },
        startTime: { type: String, required: [true, 'Start Time is required'] },
        endTime: { type: String, required: [true, 'End Time is required'] },
        where: { type: String, required: [true, 'where is required'] },
        hostname: { type: Schema.Types.ObjectId, ref: 'User' },
        image: { type: String, required: [true, 'Image url is required'] }
    },
    { timestamps: true }
);

//collection name is connections in the database
module.exports = mongoose.model('Connection', connectionSchema);