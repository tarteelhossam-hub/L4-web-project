const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('../db/connect.js');

dotenv.config();

const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const seedData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();


    const createdCategories = await Category.create([
      { name: 'Electronics', description: 'Gadgets and devices', slug: 'electronics' },
      { name: 'Books', description: 'All kinds of books', slug: 'books' },
      { name: 'Fashion', description: 'Clothing and accessories', slug: 'fashion' },
      { name: 'Fitness', description: 'Exercise and wellness', slug: 'fitness' }
    ]);

    const elId = createdCategories[0]._id;
    const bkId = createdCategories[1]._id;
    const faId = createdCategories[2]._id;


    const products = [
      { name: 'Laptop', price: 15000, description: 'Gaming laptop', category: elId, stock: 10, instock: true, images: ['https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6319/6319980_rd.jpg'] },
      { name: 'Smartphone', price: 8000, description: 'Latest android', category: elId, stock: 20, instock: true, images: ['https://tse4.mm.bing.net/th/id/OIP.L_IBmQ5JmWqU-k1Ezm9DjgHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'] },
      { name: 'Headphones', price: 500, description: 'Wireless audio', category: elId, stock: 0, instock: false, images: ['https://tse4.mm.bing.net/th/id/OIP.nE_uoT22bff3E1QQdXdeTgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3g'] },
      { name: 'Node.js Guide', price: 200, description: 'Backend dev', category: bkId, stock: 50, instock: true, images: ['https://tse1.mm.bing.net/th/id/OIP.RGS9O_FCfr8rNnED7kFuFQHaKe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'] },
      { name: 'React Course', price: 300, description: 'Frontend dev', category: bkId, stock: 30, instock: true, images: ['https://tse1.mm.bing.net/th/id/OIP.LXBVFjl4BYXEfQib_PwZsAHaJI?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'] },
      { name: 'Summer T-shirt', price: 150, description: 'Cotton fabric', category: faId, stock: 15, instock: true, images: ['https://tse1.mm.bing.net/th/id/OIP.kTcpbNqreTpUpJdbFHAaJQHaJ3?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'] },
       { name: 'Slim T-shirt', price: 150, description: 'Cotton fabric', category: faId, stock: 15, instock: true, images: ['https://tse1.mm.bing.net/th/id/OIP.kTcpbNqreTpUpJdbFHAaJQHaJ3?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'] }
    ];

    const createdProducts = await Product.insertMany(products);

    console.log('Database seeded successfully!');
    console.log(`Added ${createdCategories.length} Categories and ${createdProducts.length} Products.`);
    
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await disconnectDB();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedData();