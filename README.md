 # level 4 web devolpment 1st term project
 Name: Tarteel Hossam elsaied Mohamed Ahmed
Course: Digital Egypt Cubs  
Architecture: Model-View-Controller (MVC)  
Tech Stack: Node.js, Express.js, MongoDB, Mongoose

-------------------------------------------------------------------------------------------------------------------------------------------------

## Project Description & Features
This project is a comprehensive Backend RESTful API designed for e-commerce platforms to manage categories and products seamlessly. Built on Node.js and Express.js, the application enforces a strict Model-View-Controller (MVC) design pattern to ensure high scalability, modularity, and ease of maintenance. MongoDB is utilized as the primary database, paired with Mongoose for structured schema definitions and data validation.

###  Key Features:
* **Robust Category Management:** Full CRUD capability to organize products into logical parent and sub-categories.
* **Advanced Product Management:** Full CRUD operations supporting relational references to categories, automated stock tracking, and price validations.
* **Database Seeding System:** Automated scripts to instantly populate the database with realistic development data for rapid testing.
* **Global Error Handling Middleware:** A centralized middleware mechanism ensuring consistent, secure, and clear JSON error responses across all API endpoints.
---------------------------------------------------------------------------------------------------------------------------------------------------
#### Prerequisites & Installation

### Prerequisites:
Before deploying the application, ensure the following software suites are installed locally on your development workstation:
* **Node.js** (Version 16.x or higher)
* **npm** (Node Package Manager)
* **MongoDB** (Local instance running on port 27017 or a valid MongoDB Atlas URI)

###  Step-by-Step Installation Guide:

1. **Clone the Project Repository:**
   ```bash
   git clone <REPOSITORY_URL>
   cd <PROJECT_FOLDER_NAME>

# Install Project Dependencies
**npm install**

## Configure Environment Variables:
Create a new file named .env in the absolute root directory of the project and populate it according to the Environment Variables Table below.Seed the Database (Optional but Recommended):
**npm run seed**

### Launch the Application Server:
Development Mode (With Hot-Reloading via Nodemon):
**npm run dev**

Production Mode:
**npm start**
--------------------------------------------------------------------------------------------------------------------------------------------------
##### Environment Variables Configuration
Create a .env file in the project root and add the following parameters:


Variable Name    Data Type    Description    Example Value
--------------   ----------   ------------   --------------
port               Number    The network
                             port on which        5000
                             theExpress local
                             server listens. 
------------------------------------------------------------
MONGO_URI        string(url) The official 
                             connection string   mongodb://localhost:
                             configuration for   27017/ecommerce_db
                             MongoDB.

--------------------------------------------------------------------------------------------------------------------------------------------------

📁 Project Architecture Directory TreePlaintext

├── config/
│   └── db.js            # Centralized MongoDB connection handler via Mongoose
├── controllers/
│   ├── cartController.js      # Handles operations for cart add, update, and clear
│   ├── categoryController.js  # Handles CRUD operations for categories (Task 4.4)
│   ├── orderController.js     # Handles order placement and order history
│   └── productController.js   # Handles CRUD operations for products
├── middlewares/
│   └── errorHandler.js  # Central Error Handler middleware (Task 4.3)
├── models/
│   ├── cart.js          # Mongoose schema for the shopping cart database
│   ├── category.js      # Mongoose schema for product categories
│   ├── order.js         # Mongoose schema for customer orders
│   └── product.js       # Mongoose schema for e-commerce products
├── routes/
│   ├── cartRoutes.js     # Router mapping cart endpoints
│   ├── categoryRoutes.js # Router mapping category endpoints
│   ├── orderRoutes.js    # Router mapping order endpoints
│   └── productRoutes.js  # Router mapping product endpoints
├── scripts/
│   └── seeds.js         # Database seeder script to populate sample data
├── utils/
│   ├── AppError.js      # Custom operational error class helper (Task 4.2)
│   └── asyncHandler.js  # Async handler utility wrapper (Task 4.2)
├── .env                 # Local security environment variables (Git ignored)
├── .gitignore           # Specifies intentionally untracked files to ignore
├── app.js               # Express app and Middleware Pipeline configuration (Task 4.1)
├── package-lock.json    # Auto-generated manifest of exact dependency versions
├── package.json         # Project metadata and dependency configuration
└── README.md            # Comprehensive project documentation
## Task 8: Git Workflow Complete