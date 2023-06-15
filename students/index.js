require('dotenv').config();
require('express-async-errors')
// NOTE: I use express async errors so all errors within async function (in controllers) 
// are caught and passed to error handling middleware automatically

const express = require('express')
const app = express();

const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')

const authRouter = require('./api/auth')
const studentRouter = require('./api/student')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.set('trust proxy',1); // express rate limit documentation says that this must be done if we wish to deploy on server
app.use(rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes (milli seconds)
	max: 200, // Limit each IP to 200 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));


app.use(helmet());
app.use(cors(
    {
    origin:['http://localhost:5173'],
    credentials:true
    }
));
app.use(xss());

app.use('/students/api/v1/auth',authRouter)
app.use('/students/api/v1/student',studentRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5002;

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(port,()=>{
            console.log(`Server listening on port ${port}`)
        })
    }catch(err){
        console.log(err);
    }
}
start();