const { ObjectId } = require('mongodb');
const { connectDb } = require('../config/db');

exports.list = async (req,res,next)=> {
  try {
    const db = await connectDb();
    const data = await db.collection('accounts').find().toArray();
    res.status(200).json(data);
  } catch (e){ next(e); }
};

exports.getById = async (req,res,next)=> {
  try {
    const db = await connectDb();
    const doc = await db.collection('accounts').findOne({ _id: new ObjectId(req.params.id) });
    if(!doc) return res.status(404).json({ error:'Not found' });
    res.status(200).json(doc);
  } catch (e){ next(e); }
};

exports.create = async (req,res,next)=> {
  try {
    const db = await connectDb();
    const doc = { ...req.body, createdAt: new Date() };
    const r = await db.collection('accounts').insertOne(doc);
    res.status(201).json({ _id:r.insertedId, ...doc });
  } catch (e){ next(e); }
};

exports.update = async (req,res,next)=> {
  try {
    const db = await connectDb();
    const r = await db.collection('accounts').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if(!r.value) return res.status(404).json({ error:'Not found' });
    res.status(200).json(r.value);
  } catch (e){ next(e); }
};

exports.remove = async (req,res,next)=> {
  try {
    const db = await connectDb();
    const r = await db.collection('accounts').deleteOne({ _id:new ObjectId(req.params.id) });
    if(!r.deletedCount) return res.status(404).json({ error:'Not found' });
    res.status(204).end();
  } catch (e){ next(e); }
};
