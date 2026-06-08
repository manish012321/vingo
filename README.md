# 🛒 Vingo — Local Shop Delivery App

A full-stack delivery platform where customers can browse local shops, order items, and track deliveries in real time. Shop owners manage their store and orders through a dedicated dashboard, and delivery boys are assigned automatically.

---

## 🚀 Features

### 👤 Customer
- Sign up / Sign in with email & password or Google (Firebase)
- Forgot password via OTP email
- Auto-detect location using GPS (Geoapify reverse geocoding)
- Browse shops and items by city
- Add items to cart and place orders
- Pay online via **Razorpay** or choose Cash on Delivery
- Track order status in real time
- View order history

### 🏪 Shop Owner
- Create and manage your shop
- Add, edit, and delete items (with image upload via Cloudinary)
- Receive new orders instantly via Socket.io
- Accept/reject orders and update order status
- Real-time dashboard with today's deliveries

### 🚴 Delivery Boy
- Get assigned to orders automatically
- Verify delivery with OTP sent to customer's email
- View today's delivery list

---

## 🛠 Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| Redux Toolkit | Global state management |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Socket.io Client | Real-time communication |
| Tailwind CSS v4 | Styling |
| React Leaflet | Map display |
| Recharts | Analytics charts |
| Firebase | Google authentication |
| Razorpay JS | Payment modal |
| React Icons | Icon library |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| Socket.io | Real-time events |
| JWT + Cookies | Authentication |
| bcryptjs | Password hashing |
| Cloudinary + Multer | Image upload & storage |
| Razorpay SDK | Payment processing |
| Nodemailer | OTP & delivery emails |
| dotenv | Environment config |

---

## 📁 Project Structure

```
vingo/
├── frontend/                  # React + Vite app
│   └── src/
│       ├── pages/             # Route-level components
│       ├── hooks/             # Custom data-fetching hooks
│       ├── redux/             # Redux slices & store
│       ├── context/           # Socket context
│       ├── config.js          # Server URL config
│       ├── axiosInstance.js   # Axios with credentials
│       └── App.jsx            # Routes & socket setup
│
└── backend/                   # Express API server
    ├── controllers/           # Route handler logic
    ├── models/                # Mongoose schemas
    ├── routes/                # Express routers
    ├── middlewares/           # Auth middleware
    ├── utils/                 # Token, mail, cloudinary
    ├── socket.js              # Socket.io event handlers
    └── index.js               # App entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Razorpay account (test keys)
- Cloudinary account
- Gmail account (for Nodemailer)
- Firebase project (for Google Auth)
- Geoapify API key

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vingo.git
cd vingo
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxx

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL=your_gmail@gmail.com
PASS=your_gmail_app_password

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxxxx
VITE_GEOAPIKEY=your_geoapify_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

Start the frontend:

```bash
npm run dev
```

App runs at **http://localhost:5173**

---

## 🔐 Authentication Flow

1. User signs up → password hashed with bcrypt → JWT stored in `httpOnly` cookie
2. Every request sends the cookie automatically (`withCredentials: true`)
3. Backend `isAuth` middleware verifies JWT and attaches `userId` to request
4. Google sign-in uses Firebase on frontend → sends user data to backend → JWT cookie set

---

## 💳 Payment Flow (Razorpay)

1. Customer places order → backend creates Razorpay order via SDK
2. Frontend opens Razorpay modal with `order_id`
3. Customer completes payment
4. Frontend calls `/api/order/verify-payment` with payment signature
5. Backend verifies signature using HMAC SHA256
6. Order marked as paid, shop owner notified via Socket.io

---

## 📡 Real-time Events (Socket.io)

| Event | Direction | Description |
|---|---|---|
| `identity` | Client → Server | Register user's socket ID |
| `newOrder` | Server → Owner | Notify shop of new order |
| `orderStatusUpdate` | Server → Customer | Order status changed |
| `assignDelivery` | Server → Delivery Boy | New delivery assigned |

---

## 📧 Email Notifications

- **Password Reset OTP** — sent when user requests forgot password
- **Delivery OTP** — sent to customer when delivery boy arrives

---

## 🌍 Location Features

- GPS coordinates captured via browser Geolocation API
- Reverse geocoded to city/state using **Geoapify**
- City name normalized (diacritics stripped) before API calls
- Live location updates sent to backend via `watchPosition`
- Delivery map rendered with **React Leaflet**

---

## 📦 API Endpoints

### Auth `/api/auth`
| Method | Route | Description |
|---|---|---|
| POST | `/signup` | Register new user |
| POST | `/signin` | Login |
| POST | `/signout` | Logout |
| POST | `/send-otp` | Send password reset OTP |
| POST | `/verify-otp` | Verify OTP |
| POST | `/reset-password` | Reset password |
| POST | `/google` | Google auth |

### User `/api/user`
| Method | Route | Description |
|---|---|---|
| GET | `/current` | Get logged-in user |
| POST | `/update-location` | Update user GPS location |

### Shop `/api/shop`
| Method | Route | Description |
|---|---|---|
| POST | `/create` | Create shop |
| PUT | `/update` | Update shop |
| GET | `/get-my` | Get owner's shop |
| GET | `/get-by-city/:city` | Get shops in a city |

### Item `/api/item`
| Method | Route | Description |
|---|---|---|
| POST | `/add` | Add item to shop |
| PUT | `/edit/:itemId` | Edit item |
| DELETE | `/delete/:itemId` | Delete item |
| GET | `/get-by-city/:city` | Get items in a city |

### Order `/api/order`
| Method | Route | Description |
|---|---|---|
| POST | `/place-order` | Place a new order |
| POST | `/verify-payment` | Verify Razorpay payment |
| GET | `/my-orders` | Get customer's orders |
| POST | `/update-status/:orderId/:shopId` | Update order status |
| POST | `/send-delivery-otp` | Send delivery OTP |
| POST | `/verify-delivery-otp` | Verify delivery OTP |
| GET | `/get-today-deliveries` | Delivery boy's deliveries |

---

## 🧪 Test Credentials (Razorpay)

Use these in test mode:

- **Card:** `4111 1111 1111 1111`
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **OTP:** `1234`

---

## 📄 License

MIT — feel free to use and modify.

---

## 🙏 Acknowledgements

- [Razorpay](https://razorpay.com) — Payment gateway
- [Geoapify](https://geoapify.com) — Geocoding API
- [Cloudinary](https://cloudinary.com) — Image hosting
- [Socket.io](https://socket.io) — Real-time engine
- [Firebase](https://firebase.google.com) — Google authentication
