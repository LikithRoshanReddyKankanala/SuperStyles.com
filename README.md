🛍️ SuperStyles – E-Commerce Website

SuperStyles is a full-stack e-commerce web application with a comic superhero theme. It provides a seamless shopping experience with secure authentication, payments, and an intuitive admin dashboard for managing products and orders.

🚀 Features

👤 User Authentication: Google OAuth & JWT authentication.

🛒 Shopping Cart: Add/remove products, update quantities.

💳 Payments: Integrated PayPal for checkout simulation.

📦 Product Management: Add, edit, delete products via Admin Dashboard.

📊 Analytics: Sales summary, product categories, top-selling products.

☁️ Cloud Storage: Cloudinary integration for product images.

📱 Responsive Design: Built with Tailwind CSS for mobile & desktop.

🛠️ Tech Stack:

Frontend: React.js, Redux, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Auth: Google OAuth 2.0, JWT
Payments: PayPal SDK
Cloud: Cloudinary (images), Render/Vercel (deployment)

⚙️ Installation
Prerequisites:

Node.js & npm

MongoDB (local or Atlas cluster)

Git

Setup:

# Install dependencies for server
cd server
npm install

# Install dependencies for client
cd ../client
npm install

Run
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start

📂 Project Structure:

The app runs at http://localhost:3000
 (frontend) and http://localhost:5000
 (backend).

 SuperStyles/
│
├── client/                       # React Frontend
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── assets/               # Images, icons, static files
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/           # Buttons, forms, inputs
│   │   │   ├── layout/           # Navbar, Sidebar, Footer
│   │   │   └── charts/           # Graphs, analytics charts
│   │   ├── pages/                # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── redux/                # Redux store, slices, actions
│   │   ├── utils/                # Helpers (API calls, formatters)
│   │   ├── App.jsx               # Main app component
│   │   └── index.js              # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                       # Express Backend
│   ├── config/                   # DB & environment configs
│   │   ├── db.js                 # MongoDB connection
│   │   └── passport.js           # Google OAuth strategy
│   ├── controllers/              # Request handlers (business logic)
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/               # Auth, error handling
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Category.js
│   ├── routes/                   # Express routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── utils/                    # Utility functions
│   │   └── paypal.js             # PayPal integration helpers
│   ├── server.js                 # App entry point
│   └── package.json
│
├── .env                          # Environment variables
├── README.md
└── package.json                  # Root package (optional if managing workspaces)

