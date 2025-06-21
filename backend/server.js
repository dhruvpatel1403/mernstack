const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const authRoutes = require('./routes/authRoutes'); 
const authMiddleware = require('./middleware/authMiddleware'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);

console.log('✅ Loading auth routes...');

app.post('/api/products', authMiddleware, async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/products', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'createdAt';
    const keyword = req.query.keyword || '';

    const filter = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ]
    };

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    updated ? res.json(updated) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted ? res.json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
