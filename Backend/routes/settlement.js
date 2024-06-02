const express = require('express');
const Settlement = require('../models/settlement');
const router = express.Router();

router.post('/propose', async (req, res) => {
    const settlementAmount = req.body.amount;
    const statusAcknowledgement = req.body.statusAcknowledgement;

    try {
        if (!settlementAmount) {
            return res.status(500).json({ message: 'Please provide settlement amount' });
        }

        const latestRecord = await Settlement.find().sort({ createdAt: -1 }).limit(1);

        // If a new settlement is being proposed, dismiss the previous one
        if (latestRecord.length) {
            // Block the proposal of a new settlement if the negotiator has responded on the previous settlement
            if (latestRecord[0].status !== 'PENDING' && !statusAcknowledgement) {
                return res.status(500).json({ message: 'Negotiator has responded, Please refresh the status.' });
            }

            const latestRecordId = latestRecord[0]._id;
            await Settlement.updateOne(
                {
                    _id: latestRecordId
                },
                { $set: { status: 'DISMISS', updatedAt: new Date() } }
            );
        }

        // Add a new proposed settlement with status as PENDING
        const newSettlement = new Settlement({
            settlementAmount: settlementAmount,
            status: 'PENDING',
            updatedAt: new Date(),
            createdAt: new Date()
        });
        const new_settlement = await newSettlement.save();
        res.json({ new_settlement: new_settlement });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Please try again later' });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const latestRecord = await Settlement.find().sort({ createdAt: -1 }).limit(1);
        res.json({ proposedSettlement: latestRecord });
    } catch (error) {
        console.log(error);
        res.status(500).send('Please try again later');
    }
});

router.post('/negotiator', async (req, res) => {
    const status = req.body.status;

    try {
        if (!status) {
            return res.status(500).json({ message: 'Please provide a valid choice' });
        }

        const latestRecord = await Settlement.find().sort({ createdAt: -1 }).limit(1);
        if (latestRecord.length) {
            // Block the proposal of a new settlement if the negotiator has responded on the previous settlement
            if (latestRecord[0].status !== 'PENDING') {
                return res.status(500).json({ message: 'Settlement status cannot be updated once submitted' });
            }

            const latestRecordId = latestRecord[0]._id;
            await Settlement.updateOne(
                {
                    _id: latestRecordId
                },
                { $set: { status: status, updatedAt: new Date() } }
            );
            latestRecord[0].status = status;
            console.log('response-->>', latestRecord[0]);
            res.json({ updatedSettlement: latestRecord[0] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Please try again later' });
    }
});

module.exports = router;
