require('dotenv').config();
require("express-async-errors");

const express = require("express");
const app = express();  
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rest of the package
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');  
const fileUpload = require('express-fileupload');

//database
const connectDB = require("./db/connect");


//routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const categoryRouter = require("./routes/categoryRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

//apples
app.use("/api/forum/auth",authRouter);
app.use("/api/forum/users",userRouter);
app.use("/api/forum/posts",postRouter);
app.use("/api/forum/categories",categoryRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async (req,res) => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,console.log(`Server ${port} portunda başlatıldı`));
    } catch (error) {
        console.log(error);
    }
}
start();