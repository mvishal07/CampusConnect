const express = require('express');
const connectDB = require('./DataBase/db');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const postsRoutes = require('./Routes/postsRoutes')
dotenv.config();

const app = express();
app.use(cors())

connectDB();


app.use(cookieParser());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postsRoutes)

app.use((req, res) => {
  res.status(404).json({
    status: "failure",
    message: "404 Page Not Found",
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


