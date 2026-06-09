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

const allowedOrigins = [
  "http://localhost:5173",
  "https://vingo-git-main-manishs-projects-1b25527b.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}

const io = new Server(server, {
  cors: corsOptions
})

app.set("io", io)

const port = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

socketHandler(io)

const start = async () => {
  await connectDb()
  server.listen(port, () => {
    console.log(`Server started at ${port}`)
  })
}

start()