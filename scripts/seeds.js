const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('../db/connect.js');

dotenv.config();

const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const seedData = async () => {
  let createdCategories;
  let createdProducts;

  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();

const createdCategories = await Category.create([
  { 
    name: 'Electronics', 
    description: 'Gadgets and devices', 
    slug: 'electronics' 
  },
  { 
    name: 'Books', 
    description: 'All kinds of books', 
    slug: 'books' 
  }
]);
    const electronicsId = createdCategories[0]._id;
    const booksId = createdCategories[1]._id;

    createdProducts = await Product.insertMany([
      { name: 'Laptop', price: 15000, description: 'Powerful gaming laptop', category: electronicsId, stock: 10 },
      { name: 'Smartphone', price: 8000, description: 'Latest android phone', category: electronicsId, stock: 20 },
      { name: 'Node.js Guide', price: 200, description: 'Learn backend development', category: booksId, stock: 50 }
    ]);

    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    if (createdCategories) console.log(`Added ${createdCategories.length} Categories.`);
    if (createdProducts) console.log(`Added ${createdProducts.length} Products.`);
    
    await disconnectDB();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedData();