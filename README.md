Restaurant Backend API
A RESTful backend for a restaurant platform that manages users, restaurants, food items, categories, and orders.
🧾 Table of Contents
  Features
  
  Tech Stack
  
  Installation
  
  Environment Variables
  
  API Endpoints
  
  Data Models
  
  License

🚀 Features
User authentication and authorization (admin, vendor, client)

Manage restaurants and menus

Place and track orders

Category-wise food listings

Availability toggling and ratings

Role-based access and validations

🧰 Tech Stack
Node.js + Express.js – Server

MongoDB + Mongoose – Database

JWT / bcrypt – Authentication (if implemented)

Cloudinary / Local – Image storage (optional)

🔧 Installation
# Clone the repository
git clone git@github.com:Naveenchinthakindi/Restaurant-Backend.git

cd restaurant-backend

# Install dependencies
npm install

# Start the server (dev)
npm run dev

🔐 Environment Variables
Create a .env file in the root:
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurantDB
JWT_SECRET=your_jwt_secret_key

📦 API Endpoints (Sample)
👤 Auth
POST /api/register – Register user

POST /api/login – Login user

GET /api/profile – Get profile info (auth required)

🍴 Restaurants
GET /api/restaurants – Get all restaurants

POST /api/restaurants – Create a new restaurant

PATCH /api/restaurants/:id – Update restaurant info

🍔 Foods
GET /api/foods – Get all food items

POST /api/foods – Add food to restaurant

PATCH /api/foods/:id – Update food details

📦 Orders
POST /api/orders – Place a new order

GET /api/orders/:userId – Fetch orders by user

PATCH /api/orders/:id/status – Update order status

📝 License
This project is open-source and available under the MIT License.
