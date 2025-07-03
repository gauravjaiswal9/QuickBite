# 🍽️ QuickBite (Online Food Ordering Platform)

A full-stack web application that enables **restaurant owners** to manage food items and **customers** to browse, order, and track food in real-time. This project uses the **MERN stack** (MongoDB, Express.js, React, Node.js) and includes **authentication**, **role-based access**, and **real-time order status updates** using **Socket.io**.

---

## 🚀 Features

### ✅ Authentication
- JWT-based secure login and registration
- Role-based access for `customer` and `owner`

### 🍔 Customer Panel
- View food items and add to cart
- Place orders
- Track real-time order status updates
- View past orders
- Logout functionality

### 🧑‍🍳 Owner Panel
- Add new food items
- View all customer orders
- Update order status (Placed → Preparing → Ready → Delivered)
- Real-time status broadcast to customers
- Logout functionality

---

## 🧰 Tech Stack

| Technology   | Usage                                |
|--------------|----------------------------------------|
| MongoDB      | Database for users, food, and orders   |
| Express.js   | RESTful API server                     |
| React.js     | Frontend UI with routing and hooks     |
| Node.js      | Backend runtime environment            |
| Socket.io    | Real-time communication                |
| Tailwind CSS | Styling and responsiveness             |

---

## 📁 Folder Structure

```
order_food/
├── backend/
│   ├── config/         # DB & env config
│   ├── controllers/    # Auth/Food/Order logic
│   ├── middleware/     # Auth & Role middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route handlers
│   └── server.js       # App entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

If you’re using Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

In `tailwind.config.js`:

```js
content: ["./src/**/*.{js,jsx,ts,tsx}"]
```

In `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Start the frontend:

```bash
npm start
```

---

### 3️⃣ Real-Time Order Updates (Socket.io)

- Socket.io is integrated in both frontend and backend.
- When the restaurant owner updates the order status, the backend emits an `orderUpdated` event.
- The customer dashboard listens to this event and updates the UI in real-time.

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user

### Foods
- `POST /api/foods` — Add food (Owner only)
- `GET /api/foods` — Get all food items

### Orders
- `POST /api/orders` — Place order (Customer only)
- `GET /api/orders` — Get all orders (Owner only)
- `GET /api/orders/myorders` — Get own orders (Customer only)
- `PUT /api/orders/:id` — Update order status (Owner only)

---

## 📸 UI Screenshots

| Login/Register | Customer Dashboard | Owner Orders |
|----------------|--------------------|---------------|
| (screenshot)   | (screenshot)       | (screenshot)  |

---

## 🧠 What I Learned

- Building a role-based multi-user system using **JWT**
- Creating real-time data flow with **Socket.io**
- Structuring scalable backend APIs with **Express**
- Using **Tailwind CSS** for clean responsive design
- Managing state effectively in **React**

---

## 🔒 Role-Based Routing

- After login, users are redirected based on role:
  - Customers → `/customer/dashboard`
  - Owners → `/owner/dashboard`
- Routes are protected using custom middleware.

---

## 🛠 Future Enhancements

- ✅ Add pagination for food listing and orders
- ✅ Integrate payment gateway (e.g., Razorpay/Stripe)
- ✅ Add image upload for food items
- ✅ Notification via Email or SMS
- ✅ Admin panel for super admin to manage users

---

## 🙋 About Me

**Gaurav Kumar Jaiswal**  
👨‍🎓 B.Tech ECE, IIIT Nagpur  
📧 gauravjaiswal843@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/gauravjaiswal843)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🏁 To Run Full App

```bash
# Start backend
cd backend
npm run dev

# In a new terminal, start frontend
cd frontend
npm start
```

---

## 💡 Summary for Interviews / Resume

### Overview:
> A food ordering platform where restaurant owners can manage menus and customers can place and track orders with real-time updates using Socket.io.

### 3 Key Resume Points:
- **Built a full-stack food ordering system** using MongoDB, Express, React, and Node with Socket.io for real-time order status sync.
- **Implemented secure JWT-based role authentication** for owners and customers, with dynamic routing and access control.
- **Designed interactive UI using Tailwind CSS** for fast, responsive interfaces and component-based architecture.

---
