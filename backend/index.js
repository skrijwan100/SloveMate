const express= require("express")
const app = express()
const cors= require("cors")
const server= require("./db")
server();
require('dotenv').config();
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow only your frontend
  methods: ['GET', 'POST', 'DELETE'], // Ensure methods are in an array
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
  credentials: true, // Allow cookies/auth headers
  optionsSuccessStatus: 200 // Fixes some browser CORS issues
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());


app.use("/api/v1/auth",require("./routes/userauth"));
app.use("/api/v2/aiwork",require("./routes/aiwork"));

app.get("/",(req,res)=>{
    return res.status(200).json({"run":"Your code is running"});
  });
app.listen(process.env.PORT,()=>{
    console.log(process.env.FRONTEND_URL);
    console.log(`the app is run in ${process.env.PORT} port `);
});