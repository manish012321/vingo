import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import itemRouter from "./routes/item.routes.js"
import shopRouter from "./routes/shop.routes.js"
import orderRouter from "./routes/order.routes.js"
import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socket.js"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET"]
  }
})

app.set("io", io)

const port = process.env.PORT || 5000

//  CORS first — only once
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}))

// Body + cookie parsers before routes
app.use(express.json())
app.use(cookieParser())

//  Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

socketHandler(io)

//  Connect DB first, then start server
const start = async () => {
  await connectDb()
  server.listen(port, () => {
    console.log(`Server started at ${port}`)
  })
}

start()