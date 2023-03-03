const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    attendee: { type: Schema.Types.ObjectId, ref: 'User' },
    connection_rsvp: { type: Schema.Types.ObjectId, ref: 'Connection' },
    attendance: { type: String, requried: [true, 'cannot be empty'], unique: true }
});

module.exports = mongoose.model('rsvp', rsvpSchema);