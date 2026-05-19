const express = require("express")
require("dotenv").config()
const {logger} = require("./core/logger.js") 
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
const errorHandler = require("./core/errorHandler.js")
const cors = require("cors")
const corsOptions = require("./core/config/corsOptions.js")
const connectDB = require("./core/config/database/connexion.js")
const mongoose = require("mongoose")
const {logEvents} = require("./core/logger.js")


const PORT = process.env.PORT || 3500

connectDB();

app.use(express.json())
app.use(logger)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(errorHandler)

//#region Routes
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root.js'))
app.use('/users', require("./routes/userRoutes"))
app.all('/{*any}', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views/Errors/', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: "404 Non trouvé"})
    } else {
        res.type("txt").send("404 Non trouvé")
    }
});
//#endregion

//#region Management connection à la BDD mongodb
mongoose.connection.once('open', () => {
    console.log("Application connectée à la base de données MongoDB")
    app.listen(PORT, () => console.log(`Le serveur est lancé sur le port: ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoDB.log')
});
//#endregion