const { ObjectId } = require('mongodb');
const { connectDb } = require('../config/db');

exports.list = async (req, res, next) => {
    try {
        const db = await connectDb();
        const data = await db.collection('transactions').find({}).toArray();
        res.status(200).json(data);

    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
          console.log('BODY working:', req.body);  
        const db = await connectDb();
        const doc = {
            type: req.body.type || 'expense',
            amount: Number(req.body.amount || 0),
            category: req.body.category || 'general',
            description: req.body.description || '',
            date: req.body.date ? new Date(req.body.date) : new Date(),
            paymentMethod: req.body.paymentMethod || 'cash',
            createdAt: new Date()
        }
        const r = await db.collection('transactions').insertOne(doc);
        res.status(201).json({ ...doc, _id: r.insertedId });

    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
  try {
    const db = await connectDb();
    const { id } = req.params;
    const doc = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(doc);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const db = await connectDb();
    const { id } = req.params;
    const r = await db.collection('transactions').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!r.value) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(r.value);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const db = await connectDb();
    const { id } = req.params;
    const r = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
    if (!r.deletedCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (e) { next(e); }
};
