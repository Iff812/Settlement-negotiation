const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettlementSchema = new Schema({
    settlementAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['DISMISS', 'AGREE', 'DISPUTE', 'PENDING'],
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.pluralize(null);
module.exports = mongoose.models.Settlement || mongoose.model('Settlement', SettlementSchema);
