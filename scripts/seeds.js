const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('../config/db');

dotenv.config();

const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const seedData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    const createdCategories = await Category.insertMany([
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Books', description: 'All kinds of books' }
    ]);

    const electronicsId = createdCategories[0]._id;
    const booksId = createdCategories[1]._id;

    await Product.insertMany([
      { name: 'Laptop', price: 15000, description: 'Powerful gaming laptop', category: electronicsId, stock: 10 },
      { name: 'Smartphone', price: 8000, description: 'Latest android phone', category: electronicsId, stock: 20 },
      { name: 'Node.js Guide', price: 200, description: 'Learn backend development', category: booksId, stock: 50 }
    ]);

    console.log('Database seeded successfully! 🎉');
    
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    await disconnectDB();
    process.exit(1);
  }
};

seedData();