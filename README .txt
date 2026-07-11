# Welcome to the E-Commerce REST API ! 

## information about the author 
Name : Tarteel Hossam Elsayed Mohamed

Email : tarteelhossam@gmail.com

Github link : https://github.com/tarteelhossam-hub/L4-web-project.git


This project is a complete, educational backend built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** using the **MVC (Model-View-Controller)** design pattern. 

This guide is designed for programming students. We will explain every folder, every command, and every key line of code so you can learn how modern web servers work!

---

## 🏗️ What is MVC? (Model-View-Controller)

MVC is a smart way to organize our project folders so that each part of our code has only one job. Think of it like a restaurant:

```
  [CLIENT / USER]  <--->  [ROUTES / CONTROLLER]  <--->  [MODELS]  <--->  [DATABASE]
```

- Model : Defines how our data looks. It knows the schemas and how to talk to the database.

- View : The final data sent back to the customer. In a REST API, we send back JSON data (text-based data).

Controller : Takes the customer's request ("I want to buy a laptop"), talks to the Model to get the database records, performs calculations (like checking if there is enough stock or calculating total price), and brings the result back to the customer.

---
## 📂 Project Folder Structure

```text
PROJECT/
├── config/              # Project configuration settings.
│   └── config.js
├── controllers/         # Logic for processing requests and returning responses.
│   ├── cartController.js
│   ├── categoryController.js
│   ├── orderController.js
│   └── productController.js
├── db/                  # Database connection and configuration.
│   └── connect.js
├── middleware/          # Functions that process requests before reaching route handlers.
│   └── errorHandler.js
├── models/              # Data structures and schemas for the database.
│   ├── cart.js
│   ├── category.js
│   ├── order.js
│   └── product.js
├── node_modules/        # Installed dependencies and libraries.
├── routes/              # API endpoints mapping to controllers.
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── scripts/             # Utility scripts for seeding or maintenance.
│   └── seeds.js
├── utils/               # Helper functions and shared utilities.
│   ├── AppError.js
│   └── asyncHandler.js
├── .env                 # Environment variables.
├── .env.example         # Example of environment variables.
├── .gitignore           # Files and folders to ignore in Git.
└── app.js               # The main entry point of the application.
```
## ⚙️ Prerequisites & Setup Guide
1. Requirements
- Node.js: Install Node.js (version 18 or 20) from nodejs.org.

- Postman: A free tool to test our API endpoints from postman.com.

- MongoDB: (Optional) MongoDB Server. Our project is built with an automatic in-memory fallback. If it detects your local MongoDB is offline, it will automatically spin up a temporary database in the background!

2. Step-by-Step Installation Commands
Open your terminal inside the project folder and write these commands:

**Command A: Install Dependencies**
```bash
npm install
```

**What this does:** Reads our package.json file and downloads all required libraries (express, mongoose, dotenv, etc.) into node_modules.

**Command B:** Seed Initial Data
```bash
npm run seed
```
**What this does:** Wipes the database clean and populates it with starter categories and products.

**Command C:** Start the Server

```bash
npm run dev
```

**What this does:** Launches the server using nodemon so it restarts automatically whenever you edit and save your code!

---
## 📝 Environment Variables (.env)
Create a file named .env in the root folder of the project. Copy and paste the following values:

| Variable | Description | Example Value | 
| :--- | :--- | :--- | 
| PORT | The port number our server will listen on. | 5000 | 
| MONGO_URI | The connection string for your MongoDB database. | mongodb://127.0.0.1:27017/ecommerce_db | 
| NODE_ENV | The environment the server is running in. | development |

---
## 🎯 API Endpoint Documentation (Postman Collection Guide)
Once your server is running on http://localhost:5000, you can test our exactly 4 main folders and 7 endpoints included in the attached Postman collection:

1. Categories API (📁 categories)
GET get all categories 🟢 (Status: 200 OK)
- What it does: Fetches all categories currently in the database.

POST create category 🟡 (Status: 201 Created)

- What it does: Creates a new category.

- Body (JSON): 
```
{"name": "Electronics", "description": "Gadgets and devices"}
```
2. Products API (📁 products)
POST create product 🟡 (Status: 201 Created)

- What it does: Validates that the category exists first, then creates a new product linked to that category.

- Body (JSON):
```
 {"name": "Gaming Laptop", "price": 1200, "category": "CATEGORY_ID", "stock": 10, "description": "High performance laptop"}
```
GET all product 🟢 (Status: 200 OK)

- What it does: Retrieves all products from the database and uses Mongoose populate('category') to replace the category ID with full category details!

3. Cart API (📁 cart)
POST add to cart 🟡 (Status: 200 OK / 201 Created)

- What it does: Adds an item to the shopping cart. It automatically checks stock availability, adds the product, and dynamically calculates/updates the totalPrice of the cart.

- Body (JSON):
```
 {"productId": "PRODUCT_ID", "quantity": 2}
```
GET get cart 🟢 (Status: 200 OK)

- What it does: Views your current shopping cart items, details, and the overall total price.

4. Orders API (📁 orders)
POST create order 🟡 (Status: 201 Created)

**⚠️ Important Note for Testing: The backend expects a request body with shipping info. If you send an empty request, you will get a 400 or 500 error. Always include the body below.**

**What it does:**The final checkout step! It checks if there is sufficient stock for all items currently in the cart, subtracts the purchased quantity from the product stock in the database, completely clears (empties) the cart, and creates a permanent order history snapshot.

- Body (JSON):
**you have to use on of these words ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] all of them begain with uppercase letters**

```bash
{
  "shippingAddress": "Cairo, Egypt"
}
```
---
## 🔎 Key Backend Logic Explanations
1. Mongoose populate() Mechanism (controllers/productController.js)
When fetching products, MongoDB only returns the category ID. To get the actual category details, we use .populate():

``` bash
const products = await Product.find().populate('category');ّّ
```


**Why this is cool:** Mongoose automatically runs a secondary query behind the scenes to find the Category matching the product's category ID and replaces the ID with the full Category object.

2. Cart Dynamic Calculations (controllers/cartController.js)
When adding items to the cart, we never blindly trust input prices. The server fetches the latest price from the Product model database, multiplies it by the quantity, and recalculates the total cart price safely on the backend to avoid malicious modifications.

3. Checkout Stock Verification & Snapshots (controllers/orderController.js)
During checkout, the server verifies stock for every item before making changes. If any item is out of stock, it stops the transaction immediately and throws a clean error using our AppError class. If successful, it decrements the product stock, clears the cart items, and saves a snapshot of the price paid at that exact moment.

## 📮 How to Test using the included Postman Collection
Import the Collection: In Postman, click Import and select the file My ```Collection.postman_collection.json``` located right inside this project folder.

**Run requests in order to see the full life cycle:**

Run ```GET get all categories ```first to see seeded data.

Run ```POST create category``` to add a new section.

Run ```POST create product``` using the category ID.

Run ```POST add to cart ```to add products, then check the total via ``GET get cart``.

Finally, ``run POST create order`` with a shipping address to see the stock reduce, the order generated, and your cart automatically cleared to 0 items!

